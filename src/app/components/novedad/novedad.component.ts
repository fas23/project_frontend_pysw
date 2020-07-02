import { Component, OnInit } from '@angular/core';
import { Novedad } from './../../models/novedad';
import { Usuario } from './../../models/usuario';
import { NovedadService } from './../../services/novedad.service';
import { UsuarioService } from './../../services/usuario.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {
 
  novedad: Novedad;
  novedades: Array<Novedad>;
  existe : boolean = false;
  usuarios: Array<Usuario>;

  constructor(private servicio: NovedadService, private _toastr: ToastrService, private usServicio: UsuarioService) {
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>();
    this.usuarios = new Array<Usuario>();
    this.listarNovedades();
    this.listarUsuarios();
   }
 
  altaNovedad(){
    this.servicio.addNovedad(this.novedad).subscribe(
      (result) => {
        this._toastr.success("Novedad Registrada", "Hecho");
      }
    ),
    (error) => {
      this._toastr.error(error, "fail");
    }
    this.novedad = new Novedad();
    this.listarNovedades();
  }

  bajaNovedad(novedad: Novedad){
    this.servicio.deleteNovedad(novedad).subscribe(
      (result)=>{
        this._toastr.success("Novedad eliminada","Exito");
      }, 
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarNovedades();
  }

  modificarNovedad(){
    this.servicio.updateNovedad(this.novedad).subscribe(
      (result)=>{
        this._toastr.success("Novedad actualizada","Exito");
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.novedad = new Novedad();
    this.listarNovedades();
  }

  limpiar(){
    this.novedad = new Novedad();
  }

  listarNovedades(){
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

  listarUsuarios(){
    this.usuarios = new Array<Usuario>();
    this.usServicio.getUsuarios().subscribe(
      (result)=>{
        var us: Usuario = new Usuario();  
        result.forEach(element => {
          Object.assign(us, element); 
          this.usuarios.push(us); 
          us = new Usuario();
          console.log(result);
        });
      },
      (error)=>{
        console.log(error);
      } 
    )
  }
  
  elegirNovedad(novedad: Novedad){
    var nv = new Novedad();
    Object.assign(novedad, nv);
    this.novedad = novedad;
    this._toastr.info("Novedad elegida","Info");
  }

  ngOnInit(): void {
  }

}
