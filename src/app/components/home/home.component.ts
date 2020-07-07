import { Component, OnInit } from '@angular/core';
import {NoticiaService} from './../../services/noticia.service';
import {Noticia} from './../../models/noticia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias : Array<Noticia>;

  constructor(private servicio : NoticiaService) {
    this.noticias = new Array<Noticia>();
    this.listarNoticias();
   }

   listarNoticias(){
    this.noticias = new Array<Noticia>();
    this.servicio.getNoticiasVigen().subscribe(
      (result)=>{
        var loc: Noticia = new Noticia(); 
        result.forEach(element => {
          Object.assign(loc, element); 
          this.noticias.push(loc); 
          loc = new Noticia();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
