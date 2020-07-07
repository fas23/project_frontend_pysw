import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
//imprimir reportes 
import * as printJS from 'print-js';

//api Facebook
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';

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
  modifica : boolean = false;  
  noticiaJSON: JSON;
  //prueba mensaje posteo facebook
  mensaje: string = "";

  constructor(private noticiaServ:NoticiaService, private usuarioServ: UsuarioService, private _toastr: ToastrService,
    private fb: FacebookService, public loginService: UsuarioService) { 
      this.noti = new Noticia();
      this.noticias = new Array<Noticia>();      
      this.listarNoticias();
      this.listarUsuarios();
      this.noti.vigente= false;
      //iniciar la variables Api
      this.iniciarFb();
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
          this.noticiaJSON = result;
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

  print(){
    printJS({printable: this.noticiaJSON, properties: ['fecha', 'titulo', 'descripcion', 'usuario.usuario'], type: 'json'})

  }

  elegirNoticia(noti: Noticia) {
    this.modifica = true;
    var vnoti = new Noticia();
    Object.assign(vnoti, noti);
    this.noti = vnoti;
  }

  limpiarNoticia(){
    this.noti = new Noticia();
  }

  //CRUD noticia 
  altaNoticia(){
    this.noticiaServ.addNoticia(this.noti).subscribe(
      (result) => {
        this._toastr.success("Noticia Registrada", "Exito");
        this.listarNoticias();
      },    
      (error) => {
         this._toastr.error(error, "fail");
    }
    )

    this.noti = new Noticia();    
  }


  borrarNoticia(noti: Noticia){
      this.noticiaServ.deleteNoticia(noti).subscribe(
        (result)=>{
          this._toastr.success("Noticia ha sido borrada", "Exito");
          this.listarNoticias();
        },
        (error)=>{
          this._toastr.error(error, "fail");
        }
      )      
  }

  
  modificarNoticia(){
    this.noticiaServ.updateNoticia(this.noti).subscribe(
      (result)=>{
        this._toastr.success("Noticia ha sido actualizada", "Exito");
        this.listarNoticias();
      },
      (error)=>{
        this._toastr.error(error, "fail");
      }
    );
    this.noti = new Noticia();
    
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

  ngOnInit(): void {
  }

}
