import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import {LocalComponent} from './components/local/local.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'propietario', component: PropietarioComponent},
  {path: 'gestionLocales', component: LocalComponent},
  //{ path: 'login', component: LoginComponent },
  {path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
