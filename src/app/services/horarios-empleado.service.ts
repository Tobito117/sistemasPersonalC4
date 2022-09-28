import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HorarioEmpleadoModel } from '../models/horario-empleado.model';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class HorariosEmpleadoService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllHorariosEmpleados():Observable<any>
  {
    return this._http.get(this.baseUrl + '/HorarioEmpleados');
  }

  getHorarioEmpleado(idHorarioEmpleado: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/HorarioEmpleados/' + idHorarioEmpleado);
  }

  getHorarioEmpleadoByIdEmpleado(idEmpleado: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/HorarioEmpleados/Empleado/' + idEmpleado);
  }

  createHorarioEmpleado(horarioEmpleado: HorarioEmpleadoModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/HorarioEmpleados', horarioEmpleado);
  }

  updateHorarioEmpleado(horarioEmpleado: HorarioEmpleadoModel): Observable<any>
  {
    const body = {
      ...horarioEmpleado
    }
    return this._http.put(this.baseUrl + '/HorarioEmpleados', body);
  }

  updateEstatusHorarioEmpleado(idHorarioEmpleado: number, estatus: boolean):Observable<any>
  {
    const params = '?estatus=' + estatus;
    return this._http.delete(this.baseUrl + '/HorarioEmpleados/' + idHorarioEmpleado + params);
  }
}
