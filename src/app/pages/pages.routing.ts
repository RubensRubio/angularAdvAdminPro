
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

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
