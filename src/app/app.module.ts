import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'
import {NgxDataTableModule} from 'angular-9-datatable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { LocalComponent } from './components/local/local.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import {UsuarioService} from './services/usuario.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PropietarioComponent,
    LocalComponent,
    UsuarioComponent,
    ContratoComponent,
  NovedadComponent,
  LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:3000,
      preventDuplicates:true
    })
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
