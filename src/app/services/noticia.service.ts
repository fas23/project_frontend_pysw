import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  urlBase : string = "http://localhost:3000/api/noticia/";

  constructor(private _http:HttpClient) {    
   }
  
  //obtener todas las noticias
  getNoticias():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  getNoticiasVigen():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get( this.urlBase+"vigentes/" , httpOptions );
  }

  //agregar una noticia nueva
  addNoticia(noti: Noticia):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"  
      })
    };
    var body = JSON.stringify(noti);

    return this._http.post(this.urlBase, body , httpOptions );                                  
  }

  //Borrar noticia segun param
  deleteNoticia(noti: Noticia):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.delete( this.urlBase + noti._id, httpOptions );
  }

  //Actualizar noticia segun param
  updateNoticia(noti: Noticia):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      var body = JSON.stringify(noti);

      return this._http.put( this.urlBase + noti._id, body, httpOptions );
  }


}
