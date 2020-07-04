import { Component, OnInit } from '@angular/core';
import { Novedad } from './../../models/novedad';
import { NovedadService } from './../../services/novedad.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-novedad2',
  templateUrl: './novedad2.component.html',
  styleUrls: ['./novedad2.component.css']
})
export class Novedad2Component implements OnInit {

  novedad: Novedad;
  novedades: Array<Novedad>;

  constructor(private servicio: NovedadService, private _toastr: ToastrService) { 
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>();
    this.getNovedades();
  }

  getNovedades(){
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
