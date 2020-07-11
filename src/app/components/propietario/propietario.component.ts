import { Component, OnInit } from '@angular/core';
import { Propietario } from '../../models/propietario';
import { PropietarioService } from '../../services/propietario.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UsuarioService} from './../../services/usuario.service';
//imprimir reportes 
import * as printJS from 'print-js';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  propietarioJSON: JSON;
  existe : boolean = false;
  emailVal : boolean = false;

  constructor(private propietarioService: PropietarioService, private _toastr: ToastrService, public loginService:UsuarioService
    ) {
    this.propietario = new Propietario();
    this.propietarios = new Array<Propietario>();
    this.refrescarPropietarios();
  }

  ngOnInit(): void {
  }

  

//imprimir reportes 
print(){
  printJS({printable: this.propietarioJSON, properties: ['nombres', 'apellido', 'dni', 'telefono','email'], type: 'json'})
}
//obtener todos los propietarios
refrescarPropietarios() {
  this.propietarios = new Array<Propietario>();
  this.propietarioService.getPropietarios().subscribe(
    (result) => {
      var prop: Propietario = new Propietario();
      result.forEach(element => {
        Object.assign(prop, element);
        this.propietarios.push(prop);
        prop = new Propietario();
        this.propietarioJSON = result;
      });
      console.log(this.propietarios);
    },
    (error) => {
      console.log(error);
    }
  );
}

elegirPropietario(propietario: Propietario) {
  this.existe = true;
  var prop = new Propietario();
  Object.assign(prop, propietario);
  this.propietario = prop;
  this._toastr.info("Propietario elegido","Info");

}

//crud Propietarios
guardarPropietario(form: NgForm) {
  this.propietarioService.addPropietario(this.propietario).subscribe(
    (result) => {
      console.log(result);
      form.resetForm();
      this._toastr.success("Propietario guardado", "Exito");
      this.refrescarPropietarios();
      this.propietario = new Propietario();
    },
    (error) => {
      this._toastr.error(error, "Error");
    }
  );
}

modificarPropietario() {
  this.propietarioService.updatePropietario(this.propietario).subscribe(
    (result) => {
      this._toastr.success("Propietario actualizado", "Exito");
      this.propietario = new Propietario();
      this.existe = false;
      this.refrescarPropietarios();
    }
  );

}


borrarPropietario(id: string) {
  this.propietarioService.deletePropietario(id).subscribe(
    (result) => {
      this._toastr.success("Propietario eliminado", "Exito");
      this.refrescarPropietarios();
    },
    (error) => {
      console.log(error);
      this._toastr.error(error,"Error");
    }
  );
}

limpiar(form: NgForm) {
  this.existe = false;
  this.propietario = new Propietario();
  form.resetForm();
}

validarEmail(){
  this.emailVal = false;
    for (let i = 0; i < this.propietarios.length; i++) {
          if(this.propietarios[i].email == this.propietario.email){
            this.emailVal = true;
          }
        }
}
}
