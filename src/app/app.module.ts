import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'
import {NgxDataTableModule} from 'angular-9-datatable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { FacebookModule } from 'ngx-fb';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
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
import { NoticiaComponent } from './components/noticia/noticia.component';
import { Novedad2Component } from './components/novedad2/novedad2.component';
import { ContactoComponent } from './components/contacto/contacto.component';
//import { GoogleMapsModule } from '@angular/google-maps';


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
    LoginComponent,
    NoticiaComponent,
    Novedad2Component,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlifeFileToBase64Module,
    //GoogleMapsModule,
    FacebookModule.forRoot(),
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
