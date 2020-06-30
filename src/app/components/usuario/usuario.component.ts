import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario';
import {UsuarioService} from './../../services/usuario.service';
  import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

   usuario: Usuario;
   usuarios: Array<Usuario>;
   existe: boolean = false;

  constructor(private servicio:UsuarioService, private _toastr:ToastrService) { 
     this.usuario = new Usuario();
     this.usuarios = new Array<Usuario>();
     this.listarUsuario();
  }

  altaUsuario(){
     this.usuario.activo = true;
     this.servicio.addUsuario(this.usuario).subscribe(
       (result) => {
         this._toastr.success("Usuario Registrado", "Hecho");
       }
     ),
     (error) => {
       this._toastr.error(error, "fail");
     }
     this.usuario = new Usuario();
     this.listarUsuario();
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
    this.usuario = new Usuario();
    this.listarUsuario();
  }

  limpiar(){
    this.usuario = new Usuario();
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
    var us = new Usuario();
    Object.assign(usuario, us);
    this.usuario = usuario;
    this._toastr.info("Usuario elegido","Info");
  }

  ngOnInit(): void {
  }

}
