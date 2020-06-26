import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Contrato} from './../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  urlBase : string = "http://localhost:3000/api/contrato/";

  constructor(private _http:HttpClient) { }

getContratos():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.get( this.urlBase , httpOptions );
}

addContrato(contrato: Contrato):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  var body = JSON.stringify(contrato);
  return this._http.post(this.urlBase, body , httpOptions );
}

deleteContrato(contrato: Contrato):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.delete( this.urlBase + contrato._id , httpOptions );
}

updateContrato(contrato: Contrato):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  var body = JSON.stringify(contrato);
  return this._http.put(this.urlBase + contrato._id , body , httpOptions );    

}

getPropietarios():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.get( "http://localhost:3000/api/propietario/" , httpOptions );
}

getLocales():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.get( "http://localhost:3000/api/local/" , httpOptions );
}

}