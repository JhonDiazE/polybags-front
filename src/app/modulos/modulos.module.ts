import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonsModule } from './commons/commons.module';
import { VentasModule } from './ventas/ventas.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonsModule,
    VentasModule
  ]
})
export class ModulosModule { }
