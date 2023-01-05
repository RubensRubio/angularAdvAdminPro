import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { ObtenerUsuario } from '../interfaces/obtenerUsuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { Usuario } from '../models/usuario.models';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;


  constructor(private httpclient: HttpClient,
    private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validarToken(): Observable<boolean> {

    return this.httpclient.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { nombre, email, role, google, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        // this.usuario.imprimirUsuario(nombre);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.httpclient.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  actualizarUsuario(data: { email: string, nombre: string, role: string, password: string }) {

    data = {
      ...data,
      role: this.usuario.role!
    }

    console.log(data, this.uid);

    return this.httpclient.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }

  login(formData: LoginForm) {
    return this.httpclient.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle(token: string) {
    return this.httpclient.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logOut() {

    localStorage.removeItem('token');

    // google.accounts.id.revoke('systemsusanoo@gmail.com', () => {
    this.router.navigateByUrl('/login');
    // })
  }

  obtenerUsuarios(desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.httpclient.get<ObtenerUsuario>(url, this.headers)
      .pipe(
        // delay(1000),
        map(resp => {
          const usuarios = resp.usuarios
            .map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );
          return {
            total: resp.total,
            usuarios
          }
        })
      )

  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.httpclient.delete(url, this.headers);
  }

  actualizarUser(usuario: Usuario) {

    return this.httpclient.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

}
