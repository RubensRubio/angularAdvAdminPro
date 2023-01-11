import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpclient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  obtenerHospitales() {

    const url = `${base_url}/hospitales`;
    return this.httpclient.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
      );

  }

  crearHospital(nombre: string) {
    return this.httpclient.post(`${base_url}/hospitales`, { nombre }, this.headers);
  }


  actualizarHospital(_id: string, nombre: string) {
    return this.httpclient.put(`${base_url}/hospitales/${_id}`, { nombre }, this.headers);
  }

  eliminarHospital(_id: string) {
    return this.httpclient.delete(`${base_url}/hospitales/${_id}`, this.headers);
  }


}
