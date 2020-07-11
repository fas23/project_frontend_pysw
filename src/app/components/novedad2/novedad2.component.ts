import { Component, OnInit } from '@angular/core';
import { Novedad } from './../../models/novedad';
import { NovedadService } from './../../services/novedad.service';
import { ToastrService } from 'ngx-toastr';
import {UsuarioService} from './../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-novedad2',
  templateUrl: './novedad2.component.html',
  styleUrls: ['./novedad2.component.css']
})
export class Novedad2Component implements OnInit {

  novedad: Novedad;
  novedades: Array<Novedad>;
  usuario : Usuario;

  constructor(private servicio: NovedadService, private _toastr: ToastrService, public loginService : UsuarioService) { 
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>();
    this.usuario = new Usuario();
    this.getNovedades();
  }

  getUsuario(){
    if(this.loginService.userLoggedIn){
      this.loginService.getUsuario(this.loginService.userLogged.usuario).subscribe(
        (result) => {
          console.log("resulttttttt" + result);
          var usu : Usuario = new Usuario;
          usu = result;
          this.usuario = usu;
        }
      )
     }
    
   }

  getNovedades(){
    if(this.loginService.userLoggedIn){
      this.novedades = new Array<Novedad>();
      this.servicio.getNovedades().subscribe(
        (result)=>{
          var nv: Novedad = new Novedad();
          result.forEach(element => {
            Object.assign(nv, element);
              this.novedades.push(nv);
            nv = new Novedad();
          });
        },
        (error)=>{
          this._toastr.error(error,"Error");
        }
      )
    }
  }

  addNovedad(form:NgForm){
      this.getUsuario();
      console.log(this.usuario);
      this.novedad.usuario = this.usuario;
      this.novedad.estado = "Pendiente";
      this.novedad.fecha = new Date();
      console.log(this.novedad);
      this.servicio.addNovedad(this.novedad).subscribe(
      (result) => {
        this._toastr.success("Novedad enviada", "Exito");
        this.getNovedades();
      },
      (error) => {
        this._toastr.error(error, "Error");
      }
    )
    this.novedad = new Novedad();
    form.resetForm();
  }

  limpiar(form:NgForm){
    this.novedad = new Novedad();
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
