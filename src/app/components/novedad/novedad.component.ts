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
 
  novedades: Array<Novedad>;
  existe : boolean = false;

  constructor(private servicio: NovedadService, private _toastr: ToastrService, public loginService: UsuarioService) {
    this.novedades = new Array<Novedad>();
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

  modificarNovedad(nov : Novedad){
    nov.estado = "Procesado";
    this.servicio.updateNovedad(nov).subscribe(
      (result)=>{
        this._toastr.success("Novedad actualizada","Exito");
      },
      (error)=>{
        this._toastr.error(error,"Error");
      }
    );
    this.listarNovedades();
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
  
  ngOnInit(): void {
  }

}
