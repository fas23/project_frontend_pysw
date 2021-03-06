import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import {LocalComponent} from './components/local/local.component';
import {ContratoComponent} from './components/contrato/contrato.component';
import {NovedadComponent} from './components/novedad/novedad.component';
import {Novedad2Component} from './components/novedad2/novedad2.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {LoginComponent} from './components/login/login.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import {ContactoComponent} from './components/contacto/contacto.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'propietario', component: PropietarioComponent},
  {path: 'local', component: LocalComponent},
  {path: 'contrato', component: ContratoComponent},
  {path: 'novedad', component: NovedadComponent},
  {path: 'novedad2', component: Novedad2Component},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'login', component: LoginComponent },
  {path: 'noticia', component: NoticiaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
