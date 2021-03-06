import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userLoggedIn: boolean = false;
  userLoggedAdtt: boolean = false;  // testing
  userLogged: Usuario;
  urlBase: string = "http://localhost:3000/api/usuario/";

  constructor(private _http:HttpClient) { }

    public login(username: string, password: string): Observable<any>{
      const httpOption = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }) 
      } 
      let body = JSON.stringify({ usuario: username, password: password });
      return this._http.post(this.urlBase+"login/", body, httpOption);
    }

    

    public logout() {
      this.userLogged = new Usuario();
      this.userLoggedIn = false;
      } 


      getUsuarios(): Observable <any>{
        const httpOptions = {
          headers: new HttpHeaders({
    
          })
        };
        return this._http.get(this.urlBase, httpOptions);
      }

      getUsuario(usuario:string): Observable <any>{
        const httpOptions = {
          headers: new HttpHeaders({
            
          })
        };
        console.log(this.urlBase + usuario);
        return this._http.get(this.urlBase + usuario, httpOptions);
      }
    
      addUsuario(usuario: Usuario): Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          }),
        };
        var body = JSON.stringify(usuario);
        return this._http.post( this.urlBase, body, httpOptions);
      }
    
      updateUsuario(usuario: Usuario): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        };
        
        var body = JSON.stringify(usuario);
    
        return this._http.put( this.urlBase + usuario._id , body , httpOptions);
      }
    
      deleteUsuario(usuario: Usuario): Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
    
          })
        };
        return this._http.delete( this.urlBase + usuario._id , httpOptions );
      }
    
      getPropietarios():Observable<any>{
        const httpOptions = {
          headers: new HttpHeaders({
    
          })
        };
        return this._http.get("http://localhost:3000/api/propietario/", httpOptions);
      } 
     
}
