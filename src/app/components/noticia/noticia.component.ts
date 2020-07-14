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

  usuario: Usuario;
  vigencia : boolean = false;
  noti : Noticia;
  noticias : Array<Noticia>; 
  usuarios : Array<Usuario>;
  modifica : boolean = false;  
  noticiaJSON: JSON;
  //posteo facebook
  mensaje: string = "";

  constructor(private noticiaServ:NoticiaService, private usuarioServ: UsuarioService, private _toastr: ToastrService,
    private fb: FacebookService, public loginService: UsuarioService) { 
      this.noti = new Noticia();
      this.noti.usuario = new Usuario();
      this.noticias = new Array<Noticia>();    
      this.usuario = new Usuario();  
      this.getUsuario();
      this.listarNoticias();      
      this.listarUsuarios();    // para llenar el combo
      this.noti.vigente= false;
      //iniciar la variables Api
      this.iniciarFb();
  }

  getUsuario(){
    this.usuario = new Usuario();
    this.loginService.getUsuario(this.loginService.userLogged.usuario).subscribe(
      (result) => {
        console.log(result);
        var usu : Usuario = new Usuario;
        usu = result;
        Object.assign(this.usuario,usu);
      }
    )
  
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
          this.noticiaJSON = result;
          console.log("aqui");
          console.log(this.noticias);
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
    printJS({printable: this.noticiaJSON, properties: [{field:'fecha', displayName:'Fecha'},
    {field:'titulo', displayName:'Titulo'}, {field:'descripcion', displayName:'Descripcion'},
    {field:'usuario.usuario', displayName:'Usuario'}], type: 'json'})

  }

  elegirNoticia(noti: Noticia) {
    this.modifica = true;
    var vnoti = new Noticia();
    Object.assign(vnoti, noti);
    this.noti = vnoti;
  }

  limpiarNoticia(form : NgForm){
    this.noti = new Noticia();
    this.modifica = false;
    form.resetForm();
  }

  //CRUD noticia 
  altaNoticia(form:NgForm){
    console.log(this.usuario);
    this.noti.usuario = this.usuario;
    this.noti.fecha = new Date();
    this.noticiaServ.addNoticia(this.noti).subscribe(
      (result) => {
        this._toastr.success("Noticia Registrada", "Exito");
        this.listarNoticias();
      },    
      (error) => {
         this._toastr.error(error, "fail");
    }
    )
    form.resetForm();
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
  postFb(noticia : Noticia) {
    this.mensaje = noticia.titulo + ":  " + noticia.descripcion;
    var apiMethod: ApiMethod = "post";
    this.fb.api('/111204877317218/feed', apiMethod,
      {
        "message": this.mensaje,
        "access_token": "EAAMppWZC1UQ0BAJQBfyKYocZCUIW8Cvsx1jO21igdGcUeEspYwj4UQZC8jKlZC1xVdWpDUuDDtTWdVmsBMYFDd6ZCSZBMcKGAyZBJ9fZBg9CdZCs4aU2w74OZBraKpsoMlbTCt1pMZBOSBkV6PM1p7D7R7F959nEZBr9ZBHbyZBtVcenjeUqv5ZBwtaQLfKP91c3pzroUSZCS9ls5saL0sXbPA6iMG9P"
      });
      this._toastr.success("Posteo Registrado", "Exito");
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
