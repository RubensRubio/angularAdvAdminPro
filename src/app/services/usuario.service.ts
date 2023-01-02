import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpclient: HttpClient,
    private router: Router) { }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.httpclient.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
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

    google.accounts.id.revoke('systemsusanoo@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }
}
