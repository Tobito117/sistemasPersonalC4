import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class RecursosPagosService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllRecursosPagos():Observable<any>
  {
    return this._http.get(this.baseUrl + '/RecursosPagos');
  }

  getRecursoPago(idRecursoPago: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/RecursosPagos/' + idRecursoPago)
  }
}
