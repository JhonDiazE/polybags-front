import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCotizacionComponent } from './nueva-cotizacion/nueva-cotizacion.component';
import { RouterModule, Routes } from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { CommonsModule } from '../commons/commons.module';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
        path: '',
        redirectTo: 'nuevacotizacion',
        pathMatch: 'full',
  },
  { path: 'nuevacotizacion', component: NuevaCotizacionComponent },
  // { path: 'solicitudnueva', component: SolicitudnuevaComponent },
  // { path: 'solicitudnuevadt', component: SolicitudnuevadtComponent },
  // { path: 'solicitudhistorico', component: SolicitudhistoricoComponent },
  // { path: 'solicitudpendiente', component: SolicitudpendienteComponent },
  // { path: 'solicitudatencion', component: SolicitudatencionComponent },
  // { path: 'solicitudatenciondt', component: SolicitudatenciondtComponent },
];

@NgModule({
  declarations: [
    NuevaCotizacionComponent
  ],
  imports: [
    FormsModule,
    TableModule,
    InputSwitchModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    InputTextModule,
    FieldsetModule,
    CommonsModule,
    CommonModule,
    TabViewModule,
    RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class VentasModule { }
