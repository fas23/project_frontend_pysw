import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario';
import {UsuarioService} from './../../services/usuario.service';
import {ToastrService} from 'ngx-toastr';
import {Propietario} from './../../models/propietario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

   usuario: Usuario;
   usuarios: Array<Usuario>;
   existe: boolean = false;
   propietarios: Array<String>;
   valido: boolean = true;

  constructor(public servicio:UsuarioService, private _toastr:ToastrService) { 
     this.usuario = new Usuario();
     this.usuarios = new Array<Usuario>();
     this.propietarios = new Array<String>();
     this.listarUsuario();
     this.getPropietarios();
    }

  altaUsuario(form: NgForm){
     this.usuario.activo = true;
     this.servicio.addUsuario(this.usuario).subscribe(
       (result) => {
         this._toastr.success("Usuario Registrado", "Hecho");
       }
     ),
     (error) => {
       this._toastr.error(error, "Error");
     }
     this.listarUsuario();
     form.resetForm();
     this.usuario = new Usuario();
   }

  bajaUsuario(usuario: Usuario){
    this.usuario.activo = false;
    this.servicio.deleteUsuario(usuario).subscribe(
      (result)=>{
        this._toastr.success("Usuario eliminado","Exito");
      }, 
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarUsuario();
  }

  modificarUsuario(){
    this.servicio.updateUsuario(this.usuario).subscribe(
      (result)=>{
        this._toastr.success("Usuario actualizado","Exito");
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarUsuario();
    this.usuario = new Usuario();
    this.existe = false;
  }

  limpiar(form : NgForm){
    this.usuario = new Usuario();
    this.existe = false;
    this.valido = true;
    form.resetForm();
  }

  listarUsuario(){
    this.usuarios = new Array<Usuario>();
    this.servicio.getUsuarios().subscribe(
      (result)=>{
        var us: Usuario = new Usuario();
        result.forEach(element => {
          Object.assign(us, element);
          this.usuarios.push(us);
          us = new Usuario();
        });
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    )
  }

  
  elegirUsuario(usuario: Usuario){
    this.existe = true;
    var usu = new Usuario();
    Object.assign(usu, usuario);
    this.usuario = usu;
    this._toastr.info("Usuario elegido","Info");
  }

  getPropietarios(){
    this.propietarios = new Array<String>();
    this.servicio.getPropietarios().subscribe(
      (result)=>{
        var prop: Propietario = new Propietario();
        result.forEach(element => {
          Object.assign(prop, element);
            this.propietarios.push(prop.email);
          prop = new Propietario();
        });
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    )
  }

  validarUsuario(){
    this.valido = true;
      for (let i = 0; i < this.usuarios.length; i++) {
            if(this.usuarios[i].usuario == this.usuario.usuario){
              this.valido = false;
            }
          }
  }

  ngOnInit(): void {
  }

}
