import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';
import { DepartamentoModel } from '../models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllDepartamentos():Observable<any>
  {
    return this._http.get(this.baseUrl + '/Departamentos');
  }

  getDepartamento(idDepartamento: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/Departamentos/' + idDepartamento);
  }

  createDepartamento(departamento: DepartamentoModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/Departamentos', departamento);
  }

  updateDepartamento(departamento: DepartamentoModel):Observable<any>
  {
    const body = {
      ...departamento
    }

    return this._http.put(this.baseUrl + '/Departamentos', departamento);
  }

  updateEstatusDepartamento(idDepartamento: number, estatus: boolean):Observable<any>
  {
    const params = '?estatus=' + estatus;
    return this._http.delete(this.baseUrl + '/Departamentos/' + idDepartamento + params);
  }
}
