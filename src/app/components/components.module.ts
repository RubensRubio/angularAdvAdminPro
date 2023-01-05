import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { IcrementadorComponent } from './icrementador/icrementador.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IcrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    IcrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
  ]
})
export class ComponentsModule { }
