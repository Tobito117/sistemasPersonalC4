import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';

import { EmpleadoModel } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllEmpleados():Observable<any>
  {
    return this._http.get(this.baseUrl + '/Empleados');
  }

  getEmpleado(idEmpleado: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/Empleados/' + idEmpleado);
  }

  createEmpleado(empleado: EmpleadoModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/Empleados', empleado);
  }

  updateEmpleado(empleado: EmpleadoModel):Observable<any>
  {
    const body = {
      ...empleado
    }

    return this._http.put(this.baseUrl + '/Empleados', empleado);
  }

  updateEstatusEmpleado(idEmpleado: number, estatus: boolean):Observable<any>
  {
    const params = '?estatus=' + estatus;
    return this._http.delete(this.baseUrl + '/Empleados/' + idEmpleado + params);
  }
}
