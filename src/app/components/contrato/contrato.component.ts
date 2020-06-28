import { Component, OnInit } from '@angular/core';
import { Contrato } from './../../models/contrato';
import { ContratoService } from './../../services/contrato.service';
import { ToastrService } from 'ngx-toastr';
import { Propietario } from 'src/app/models/propietario';
import { Local } from './../../models/local';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  contrato: Contrato;
  contratos: Array<Contrato>;
  existe: boolean;
  propietarios: Array<Propietario>;
  locales: Array<Local>;
  cerrado : boolean = false;

  constructor(private conService: ContratoService, private _toastr: ToastrService) {
    this.contrato = new Contrato();
    this.contratos = new Array<Contrato>();
    this.propietarios = new Array<Propietario>();
    this.locales = new Array<Local>();
    this.contrato.locales = new Array<Local>();
    this.contrato.costoTotalAlq = 0;
    this.obtenerPropietarios();
    this.obtenerLocales();
    this.listarContratos();
  }

  elegirContrato(cont: Contrato) {
    this.existe = true;
    var contrato = new Contrato();
    Object.assign(contrato, cont);
    this.contrato = contrato;
    this.cerrado = this.contrato.cerrado;
    this._toastr.info("Contrato elegido", "Info");
  }

  modificarContrato() {
    this.conService.updateContrato(this.contrato).subscribe(
      (result) => {
        this._toastr.success("Contrato actualizado", "Exito");
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    );
    this.contrato = new Contrato();
    this.existe = false;
    //this.modificarLocal();
    this.listarContratos();
    this.obtenerLocales();
  }

  borrarContrato(cont: Contrato) {
    this.cerrado = false;
    this.contrato.locales = new Array<Local>();
    this.conService.deleteContrato(cont).subscribe(
      (result) => {
        this._toastr.success("Contrato eliminado", "Exito");
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    );
    for (let i = 0; i < cont.locales.length; i++){
    this.quitarLocal(cont.locales[i]);
    }
    this.listarContratos();
  }


  saveContrato() {
    this.contrato.cerrado = false;
    this.contrato.fecha = new Date();
    this.conService.addContrato(this.contrato).subscribe(
      (result) => {
        this._toastr.success("Contrato guardado", "Exito");
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    )
    this.locales = new Array<Local>();
    this.contrato = new Contrato();
    //this.modificarLocal();
    this.obtenerLocales();
    this.listarContratos();
  }

  listarContratos() {
    this.contratos = new Array<Contrato>();
    this.conService.getContratos().subscribe(
      (result) => {
        var cont: Contrato = new Contrato();
        result.forEach(element => {
          Object.assign(cont, element);
          this.contratos.push(cont);
          cont = new Contrato();
        });
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    )
  }


  limpiar() {
    this.contrato = new Contrato();
    this.existe = false;
    this.cerrado = false;
  }

  obtenerPropietarios() {
    this.propietarios = new Array<Propietario>();
    this.conService.getPropietarios().subscribe(
      (result) => {
        var prop: Propietario = new Propietario();
        result.forEach(element => {
          Object.assign(prop, element);
          this.propietarios.push(prop);
          prop = new Propietario();
        });
      },
      (error) => {
        console.log(error);
      }
    )
    console.log("propietarios   " + this.propietarios);
  }

  obtenerLocales() {
    this.locales = new Array<Local>();
    this.conService.getLocales().subscribe(
      (result) => {
        var local: Local = new Local();
        result.forEach(element => {
          Object.assign(local, element);
          this.locales.push(local);
          local = new Local();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  agregarLocal(local: Local) {
    this.contrato.locales.push(local);
    var costo: number = 0;
    var deposito: number = local.costomes * 0.5;
    costo = local.costomes + deposito;
    this.contrato.costoTotalAlq += costo;
    local.alquilado = true;
    this.modificarLocal(local);
  }


  modificarLocal(local:Local) {
    // for (let i = 0; i < this.contrato.locales.length; i++) {
    //     this.contrato.locales[i].alquilado = true;
//    this.conService.updateLocal(this.contrato.locales[i]).subscribe(
      this.conService.updateLocal(local).subscribe(
        (result) => {
        console.log("Local modificado");
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    );//}
  }

  quitarLocal(local: Local) {
    var indice = this.contrato.locales.findIndex((element) => element._id == local._id);
    this.contrato.locales.splice(indice, 1);
    var costo: number = 0;
    var deposito: number = local.costomes * 0.5;
    costo = local.costomes + deposito;
    this.contrato.costoTotalAlq -= costo;
    local.alquilado = false;
    this.modificarLocal(local);
  }

  cerrarContrato(contrato: Contrato) {
    console.log("cerrar contrato");
    contrato.cerrado = true;
    this.conService.updateContrato(contrato).subscribe(
      (result) => {
        this._toastr.success("Contrato cerrado", "Exito");
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    );
    this.listarContratos();
  }

  ngOnInit(): void {
  }

}

