import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCotizacionComponent } from './nueva-cotizacion/nueva-cotizacion.component';
import { RouterModule, Routes } from '@angular/router';
import {TabViewModule} from 'primeng/tabview';

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
    CommonModule,
    TabViewModule,
    RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class VentasModule { }
