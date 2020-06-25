import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  urlBase: string = "http://localhost:3000/api/propietario/"

  constructor(private _http: HttpClient) { }

  getPropietarios():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }


  //crud propietariso

  addPropietario(propietario: Propietario): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    };
    var body = JSON.stringify(propietario);
    return this._http.post( this.urlBase, body, httpOptions);
  }

  updatePropietario(propietario: Propietario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    
    var body = JSON.stringify(propietario);

    return this._http.put( this.urlBase + propietario._id , body , httpOptions);
  }

  deletePropietario(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + id, httpOptions);
  }

}
