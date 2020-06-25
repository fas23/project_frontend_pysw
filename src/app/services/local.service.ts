import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Local} from './../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  urlBase : string = "http://localhost:3000/api/local/";

  constructor(private _http:HttpClient) { }


  getLocales():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addLocal(local: Local):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(local);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteLocal(local: Local):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + local._id , httpOptions );
  }

  updateLocal(local: Local):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(local);
    return this._http.put(this.urlBase + local._id , body , httpOptions );    

  }

  getLibres():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase+"libre" , httpOptions );
  }

}
