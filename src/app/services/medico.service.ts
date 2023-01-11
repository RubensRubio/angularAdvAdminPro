import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  obtenerMedicos() {

    const url = `${base_url}/medicos`;
    return this.httpclient.get<{ ok: boolean, medicos: Medico[] }>(url, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
      );

  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    return this.httpclient.post(`${base_url}/medicos`, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    return this.httpclient.put(`${base_url}/medicos/${medico._id}`, medico, this.headers);
  }

  eliminarMedico(_id: string) {
    return this.httpclient.delete(`${base_url}/medicos/${_id}`, this.headers);
  }

  obtenerMedicoById(id: string) {

    const url = `${base_url}/medicos/${id}`;
    console.log(url)
    return this.httpclient.get<{ ok: boolean, medico: Medico }>(url, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean, medico: Medico }) => resp.medico
        )
      );

  }

}
