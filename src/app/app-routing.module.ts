import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  // {path:'', redirectTo:'ventas', pathMatch:'full'},
  // {path:'login', component:LoginComponent},
  // {path:'home', component:HomeComponent},
  // { path: 'ventas', loadChildren: () => import('./modulos/ventas/ventas.module').then(m => m.VentasModule), 
  //   //canActivate: [AuthGuard]
  // }
  {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path: 'pages', component: AppMainComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'home', component:HomeComponent, canActivate:[AuthguardService]},
      {path: 'ventas', loadChildren: () => import('./modulos/ventas/ventas.module').then(m => m.VentasModule), 
          canActivate: [AuthguardService]
      }

  ]
  },
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
