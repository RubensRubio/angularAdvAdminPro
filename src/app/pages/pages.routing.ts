
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RkjsComponent } from './rkjs/rkjs.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'DashBoard' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas' } },
      { path: 'settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },
      { path: 'rxjs', component: RkjsComponent, data: { titulo: 'RxJs' } },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
