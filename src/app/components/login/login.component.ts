import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
 returnUrl: string;
 msglogin: string;
 constructor(private route: ActivatedRoute, private router: Router, public loginService:UsuarioService
 ){
   this.usuario = new Usuario();
 }

 public login() {
  this.loginService.login(this.usuario.usuario, this.usuario.password)
  .subscribe(
  (result) => {
  var user = result;
  console.log(user);
  if (user.status == 1){
 this.loginService.userLoggedIn = true;
  this.loginService.userLogged = user;
 this.router.navigateByUrl(this.returnUrl);
  } else {
  this.msglogin="Credenciales incorrectas..";
 }
  },
  error => {
  console.log("error en conexion");
  console.log(error);
  });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'; 
  }

}
