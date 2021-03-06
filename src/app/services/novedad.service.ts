import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Novedad } from './../models/novedad';
import {Usuario} from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  urlBase : string = "http://localhost:3000/api/novedad/";

  constructor(private _http:HttpClient) { }


  getNovedades():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  
  getNovedadesProp(usuario:Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    
    return this._http.get( this.urlBase+"prop/:" + usuario , httpOptions );
  }

  addNovedad(novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(novedad);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteNovedad(novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + novedad._id , httpOptions );
  }

  updateNovedad(novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(novedad);
    return this._http.put(this.urlBase + novedad._id , body , httpOptions );    

  }

  getPropietario(email: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this._http.put(this.urlBase + email , httpOptions );    

  }

}
