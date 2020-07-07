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
  var prop = new Propietario();
  Object.assign(prop, propietario);
  this.propietario = prop;
}

//crud Propietarios
guardarPropietario(form: NgForm) {
  this.propietarioService.addPropietario(this.propietario).subscribe(
    (result) => {
      console.log(result);
      form.resetForm();
      this._toastr.success("guardado con exito", "Exito");
      this.refrescarPropietarios();
      this.propietario = new Propietario();
    },
    (error) => {
      console.log("error");
      this._toastr.error("Error en la peticion", "Error");
    }
  );
}

modificarPropietario() {
  this.propietarioService.updatePropietario(this.propietario).subscribe(
    (result) => {
      this._toastr.success("editado con exito", "Exito");
      this.propietario = new Propietario();
      this.refrescarPropietarios();
    }
  );

}


borrarPropietario(id: string) {
  this.propietarioService.deletePropietario(id).subscribe(
    (result) => {
      this._toastr.success("Asistente eliminado con exito", "Exito");
      this.refrescarPropietarios();
    },
    (error) => {
      console.log(error);
    }
  );
}

limpiar(form: NgForm) {
  this.propietario = new Propietario();
  form.resetForm();
}
}
