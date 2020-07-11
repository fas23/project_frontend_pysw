import { Component, OnInit } from '@angular/core';
import {Local} from './../../models/local';
import {LocalService} from './../../services/local.service';
import {ToastrService} from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {UsuarioService} from './../../services/usuario.service';

//imprimir reportes 
import * as printJS from 'print-js';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  convertido : string = "";
  existe : boolean = false;
  local : Local;
  locales : Array<Local>;
  localJSON: JSON;

  constructor(private localServ:LocalService, private _toastr:ToastrService, public loginService:UsuarioService) { 
    this.local = new Local();
    this.convertido = "";
    this.locales = new Array<Local>();
    this.listarLocales();
    this.local.alquilado = false;
  }

  elegirLocal(loc : Local){
    this.existe = true;
    var local = new Local();
    Object.assign(local, loc);
    this.local = local;
    this._toastr.info("Local elegido","Info");
  }

  modificarLocal(){
    this.localServ.updateLocal(this.local).subscribe(
      (result)=>{
        this._toastr.success("Local actualizado","Exito");
        this.listarLocales();
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.local = new Local();
    this.existe = false;
  }
   
  borrarLocal(loc: Local){
    this.localServ.deleteLocal(loc).subscribe(
      (result)=>{
        this._toastr.success("Local eliminado","Exito");
        this.listarLocales();
      }, 
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
  }


  saveLocal(form: NgForm){
    this.local.alquilado = false;
    this.localServ.addLocal(this.local).subscribe(
        (result)=>{
          this._toastr.success("Local guardado","Exito");
          this.listarLocales();
        },
        (error)=>{
          this._toastr.error(error,"Error");
        }
      ) 
      form.resetForm();
      this.local = new Local();
  }

  listarLocales(){
    this.locales = new Array<Local>();
    this.localServ.getLocales().subscribe(
      (result)=>{
        var loc: Local = new Local();
        result.forEach(element => {
          Object.assign(loc, element);
          this.locales.push(loc);
          loc = new Local();
          this.localJSON = result;
        });
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    )
  }

  cambiarArchivo(files){
    console.log("archivo cambiado", files);
    this.convertido=files[0].base64;
    this.local.imagen = this.convertido;
  }

  limpiar(form:NgForm){
    this.local = new Local();
    this.existe = false;
    form.resetForm();
  }

  getLocalesLibres(){
    this.locales = new Array<Local>();
    this.localServ.getLibres().subscribe(
      (result)=>{
        var loc: Local = new Local();
        result.forEach(element => {
          Object.assign(loc, element);
          this.locales.push(loc);
          loc = new Local();
        });
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    )
  }

  print(){
    printJS({printable: this.localJSON, properties: [{field:'superficie', displayName:'Superficie'},
                                                     {field:'costoMes', displayName:'Costo Mensual'},
                                                     {field:'alquildo', displayName: 'Alquilado'},
                                                     {field:'descripcion', displayName:'Descripcion'}], type: 'json'})

  }

  ngOnInit(): void {
  }

}
