import { Component, OnInit } from '@angular/core';
import { Propietario } from '../../models/propietario';
import { PropietarioService } from '../../services/propietario.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
<<<<<<< HEAD
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';
=======
import {UsuarioService} from './../../services/usuario.service';
>>>>>>> master

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  //prueba mensaje posteo facebook
  mensaje: string = "";

<<<<<<< HEAD
  constructor(private propietarioService: PropietarioService, private _toastr: ToastrService,
    private fb: FacebookService) {
    this.iniciarFb();
=======
  constructor(private propietarioService: PropietarioService, private _toastr: ToastrService, public loginService:UsuarioService) {
>>>>>>> master
    this.propietario = new Propietario();
    this.propietarios = new Array<Propietario>();
    this.refrescarPropietarios();
  }

  ngOnInit(): void {
  }

  //implementacion ApiFacebook
  postFb() {
    var apiMethod: ApiMethod = "post";
    this.fb.api('/111204877317218/feed', apiMethod,
      {
        "message": this.mensaje,
        "access_token": "EAAMppWZC1UQ0BACbtQpfG3ZAEJO0vxgeHBfv5wHii07UYPhh2pcP4ZAkh3mStgWsMPgJM9sLe78M4kWVk4S1ZAZAKghYKwgECesCoymryBocb9zQkkJWHkGTexOUNwQIE3RmN7kHb9qkWep0H3Rii0zSudtW34NncRh1TtZAfZAIT34E0KnpTeLBOBQco8vlWl1DrxlNevbkHhrXZAzazPEm"
      });
  }

  iniciarFb() {
    let initParams: InitParams =
    {
      //id de la app en developers
      appId: '890215454822669',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    };
    this.fb.init(initParams);
  }

//fin implementacion ApiFacebook

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
