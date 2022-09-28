import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';
import { PuestoModel } from '../models/puesto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  login(idUser: number, contrasenia: string):Observable<any>
  {
    const body = {
      idUser: idUser,
      PassUser: contrasenia
    }

    return this._http.post(this.baseUrl + '/users/Login', body);
  }

  // getAllPuestos():Observable<any>
  // {
  //   return this._http.get(this.baseUrl + '/Puestos');
  // }

  // getPuesto(idPuesto: number):Observable<any>
  // {
  //   return this._http.get(this.baseUrl + '/Puestos/' + idPuesto);
  // }

  // createPuesto(puesto: PuestoModel):Observable<any>
  // {
  //   return this._http.post(this.baseUrl + '/Puestos', puesto);
  // }

  // updatePuesto(puesto: PuestoModel):Observable<any>
  // {
  //   const body = {
  //     ...puesto
  //   }

  //   return this._http.put(this.baseUrl + '/Puestos', puesto);
  // }

  // updateEstatusPuesto(idPuesto: number, estatus: boolean):Observable<any>
  // {
  //   const params = '?estatus=' + estatus;
  //   return this._http.delete(this.baseUrl + '/Puestos/' + idPuesto + params);
  // }
}
