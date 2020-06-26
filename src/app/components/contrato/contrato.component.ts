import { Component, OnInit } from '@angular/core';
import {Contrato} from './../../models/contrato';
import {ContratoService} from './../../services/contrato.service';
import {ToastrService} from 'ngx-toastr';
import { Propietario } from 'src/app/models/propietario';
import {Local} from './../../models/local';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  contrato : Contrato;
  contratos : Array<Contrato>;
  existe : boolean;
  propietarios : Array<Propietario>;
  locales : Array<Local>;

  constructor(private conService:ContratoService, private _toastr:ToastrService) {
    this.contrato = new Contrato();
    this.contratos = new Array<Contrato>();
    this.propietarios = new Array<Propietario>();
    this.locales = new Array<Local>();
    this.listarContratos();
    this.obtenerPropietarios();
   }

  elegirContrato(cont : Contrato){
    this.existe = true;
    var contrato = new Contrato();
    Object.assign(contrato, cont);
    this.contrato = contrato;
    this._toastr.info("Pasaje elegido","Info");
  }

  modificarContrato(){
    this.conService.updateContrato(this.contrato).subscribe(
      (result)=>{
        this._toastr.success("Contrato actualizado","Exito");
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.contrato = new Contrato();
    this.existe = false;
    this.listarContratos();
  }
   
  borrarContrato(cont: Contrato){
    this.conService.deleteContrato(cont).subscribe(
      (result)=>{
        this._toastr.success("Contrato eliminado","Exito");
      }, 
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarContratos();
  }


  saveContrato(){
    this.contrato.cerrado = false;
    this.conService.addContrato(this.contrato).subscribe(
        (result)=>{
          this._toastr.success("Contrato guardado","Exito");
        },
        (error)=>{
          this._toastr.error(error,"Error");
        }
      ) 
      this.contrato = new Contrato();
      this.listarContratos();
  }

  listarContratos(){
    console.log("entro a listar");
    this.contratos = new Array<Contrato>();
    this.conService.getContratos().subscribe(
      (result)=>{
        var cont: Contrato = new Contrato();
        result.forEach(element => {
          Object.assign(cont, element);
          console.log(cont);
          this.contratos.push(cont);
          cont = new Contrato();
        });
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    )
  }


  limpiar(){
    this.contrato = new Contrato();
    this.existe = false;
  }

  obtenerPropietarios(){
        

  }

  obtenerLocales(){
    this.locales = new Array<Local>();
    this.conService.getLocales().subscribe(
      (result)=>{
        var local: Local = new Local();
        result.forEach(element => {
          Object.assign(local, element);
          this.locales.push(local);
          local = new Local();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  agregarLocal(local:Local){}

  quitarLocal(local:Local){}

  ngOnInit(): void {
  }

}
