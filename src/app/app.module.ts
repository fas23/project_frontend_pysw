import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms'
import {NgxDataTableModule} from 'angular-9-datatable';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
//import { PropietarioComponent } from './components/propietario/propietario.component';
import { LocalComponent } from './components/local/local.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ToastrModule} from 'ngx-toastr';
import { ContratoComponent } from './components/contrato/contrato.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  //  PropietarioComponent,
    LocalComponent,
  ContratoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlifeFileToBase64Module,
    ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
