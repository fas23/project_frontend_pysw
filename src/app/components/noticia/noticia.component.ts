import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  vigencia : boolean = false;
  noti : Noticia;
  noticias : Array<Noticia>; 
  usuarios : Array<Usuario>;

  constructor(private noticiaServ:NoticiaService, private usuarioServ: UsuarioService) { 
      this.noti = new Noticia();
      this.noticias = new Array<Noticia>();      
      this.listarNoticias();
      this.listarUsuarios();
      this.noti.vigente= false;
  }

  
  // trae las noticias de la API
  listarNoticias(){
    this.noticias = new Array<Noticia>();
    this.noticiaServ.getNoticias().subscribe(
      (result)=>{
        var loc: Noticia = new Noticia(); 
        result.forEach(element => {
          Object.assign(loc, element); 
          this.noticias.push(loc); 
          loc = new Noticia();
          console.log(result);
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  listarUsuarios(){
    this.usuarios = new Array<Usuario>();
    this.usuarioServ.getUsuarios().subscribe(
      (result)=>{
        var vusuario: Usuario = new Usuario();  
        result.forEach(element => {
          Object.assign(vusuario, element); 
          this.usuarios.push(vusuario); 
          vusuario = new Usuario();
          console.log(result);
        });
      },
      (error)=>{
        console.log(error);
      } 
    )

  }

  //agrega noticia
  altaNoticia(){
    this.noticiaServ.addNoticia(this.noti).subscribe(
      (result) => {
        alert("Noticia guardada en BD..");
        //this._toastr.success("Noticia Registrada", "Hecho");
      },    
      (error) => {
         console.log(error);
         // this._toastr.error(error, "fail");
    }
    )
    this.noti = new Noticia();
    this.listarNoticias();
  }



  ngOnInit(): void {
  }

}
