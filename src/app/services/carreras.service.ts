import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllCarreras():Observable<any>
  {
    return this._http.get(this.baseUrl + '/Carreras');
  }

  getCarrera(idCarrera: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/Carreras/' + idCarrera);
  }
}
