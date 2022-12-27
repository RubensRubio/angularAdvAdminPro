import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { IcrementadorComponent } from './icrementador/icrementador.component';



@NgModule({
  declarations: [
    IcrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    IcrementadorComponent,
    DonaComponent,
  ]
})
export class ComponentsModule { }
