import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import {LocalComponent} from './components/local/local.component';
import {ContratoComponent} from './components/contrato/contrato.component';
import {NovedadComponent} from './components/novedad/novedad.component';
import {UsuarioComponent} from './components/usuario/usuario.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'propietario', component: PropietarioComponent},
  {path: 'gestionLocales', component: LocalComponent},
  {path: 'contrato', component: ContratoComponent},
  {path: 'novedad', component: NovedadComponent},
  {path: 'usuario', component: UsuarioComponent},
  //{ path: 'login', component: LoginComponent },
  {path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
