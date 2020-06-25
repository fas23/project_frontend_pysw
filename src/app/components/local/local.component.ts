import { Component, OnInit } from '@angular/core';
import {Local} from './../../models/local';
import {LocalService} from './../../services/local.service';
import {ToastrService} from 'ngx-toastr';
import { NgForm } from '@angular/forms';

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

  constructor(private localServ:LocalService, private _toastr:ToastrService) { 
    this.local = new Local();
    this.locales = new Array<Local>();
    this.listarLocales();
    this.local.alquilado = false;
  }

  elegirLocal(loc : Local){
    this.existe = true;
    var local = new Local();
    Object.assign(local, loc);
    this.local = local;
    this._toastr.info("Pasaje elegido","Info");
  }

  modificarLocal(){
    this.localServ.updateLocal(this.local).subscribe(
      (result)=>{
        this._toastr.success("Pasaje actualizado","Exito");
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.local = new Local();
    this.existe = false;
    this.listarLocales();
  }
   
  borrarLocal(loc: Local){
    this.localServ.deleteLocal(loc).subscribe(
      (result)=>{
        this._toastr.success("Asistente eliminado","Exito");
      }, 
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarLocales();
  }


  saveLocal(){
    this.local.alquilado = false;
    this.localServ.addLocal(this.local).subscribe(
        (result)=>{
          this._toastr.success("Pasaje guardado","Exito");
        },
        (error)=>{
          this._toastr.error(error,"Error");
        }
      ) 
      this.local = new Local();
      this.listarLocales();
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

  limpiar(){
    this.local = new Local();
    this.existe = false;
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

  ngOnInit(): void {
  }

}
