import { Component, OnInit } from '@angular/core';
import {Novedad} from './../../models/novedad';
import {NovedadService} from './../../services/novedad.service';
import {Propietario} from './../../models/propietario';
import {ToastrService} from 'ngx-toastr';
import {Usuario} from './../../models/usuario';
import {UsuarioService} from './../../services/usuario.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  novedad:Novedad;
  propietario : Propietario;
  usuario : Usuario;
  nombre : string = "";
  email : string = "";
  mensaje : string = "";
  punto = {
    title:"",
    position: {
    lat: 0,
    lng: 0,
    },
    label: {
    color:"",
    text: ""
 }
 };

  constructor(private servicio:NovedadService, private _toastr:ToastrService, 
    public usuarioServi : UsuarioService, config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
      this.novedad= new Novedad();
      this.propietario = new Propietario();
      this.usuario= new Usuario();
      //this.dibujarPunto();
     }

     dibujarPunto(){
      this.punto.position.lat = -24.1891782;
      this.punto.position.lng = -65.2933198;
      this.punto.label.text = "FI";
      this.punto.label.color = "blue";
      this.punto.title="Facultad de Ingenieria UNJu";
      }

      cambiarArchivo(files){
        console.log("archivo cambiado", files);
      }
  
     addNovedad(){
       if(this.usuarioServi.userLogged){
        this.getUsuario();
        this.novedad.usuario = this.usuario;
      }
       else{
         this.mensaje = "Persona externa, nombre: "+this.nombre+", email: "+this.email+". Mensaje: "+this.novedad.texto;
         this.novedad.texto = this.mensaje;
       }
      this.novedad.estado = "Pendiente";
      this.novedad.fecha = new Date();
      this.servicio.addNovedad(this.novedad).subscribe(
        (result) => {
          this._toastr.success("Novedad enviada", "Exito");
        },
        (error) => {
          this._toastr.error(error, "Error");
        }
      )
      this.novedad = new Novedad();
     }
  
     getUsuario(){
      console.log(this.usuarioServi.userLogged);
      if(this.usuarioServi.userLoggedIn){
        this.usuarioServi.getUsuario(this.usuarioServi.userLogged.usuario).subscribe(
          (result) => {
            this.usuario= result;
            console.log(this.usuario);
          }
        )
        this.getPropietario()
       }
      
     }
  
     getPropietario(){
      if(this.usuarioServi.userLoggedIn){
        console.log("proppp: " + this.usuarioServi.userLogged);
        this.servicio.getPropietario(this.usuario.usuario).subscribe(
         (result) => {
           this.propietario = result;
           console.log(this.propietario);
         }
       )
     }
    }
  
    open(content) {
      this.modalService.open(content);
    }
  

  ngOnInit(): void {
  }

}
