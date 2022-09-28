import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';
import { CorporacionModel } from '../models/corporacion.model';

@Injectable({
  providedIn: 'root'
})
export class CorporacionesService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllCorporaciones():Observable<any>
  {
    return this._http.get(this.baseUrl + '/Corporaciones');
  }

  getCorporacion(idCorporacion: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/Corporaciones/' + idCorporacion);
  }

  createCorporacion(corporacion: CorporacionModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/Corporaciones', corporacion);
  }

  updateCorporacion(corporacion: CorporacionModel):Observable<any>
  {
    const body = {
      ...corporacion
    }

    return this._http.put(this.baseUrl + '/Corporaciones', corporacion);
  }

  updateEstatusCorporacion(idCorporacion: number, estatus: boolean):Observable<any>
  {
    const params = '?estatus=' + estatus;
    return this._http.delete(this.baseUrl + '/Corporaciones/' + idCorporacion + params);
  }
}
