
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RkjsComponent } from './rkjs/rkjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'DashBoard' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfiles' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RkjsComponent, data: { titulo: 'RxJs' } },
      { path: 'settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },

      //Mantenimientos

      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos' } },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
