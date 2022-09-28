import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoHorarioModel } from '../models/catalogo-horario.model';

import { Global } from './global';
// import { CorporacionModel } from '../models/corporacion.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoHorariosService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllCatalogoHorarios():Observable<any>
  {
    return this._http.get(this.baseUrl + '/CatalogoHorarios');
  }

  getHorario(idCatalogoHorario: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/CatalogoHorarios/' + idCatalogoHorario);
  }

  createHorario(horario: CatalogoHorarioModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/CatalogoHorarios', horario);
  }

  updateHorario(horario: CatalogoHorarioModel):Observable<any>
  {
    const body = {
      ...horario
    }

    return this._http.put(this.baseUrl + '/CatalogoHorarios', body);
  }

  updateEstatusHorario(idCatalogoHorario: number, estatus: boolean):Observable<any>
  {
    const params = '?estatus=' + estatus;
    return this._http.delete(this.baseUrl + '/CatalogoHorarios/' + idCatalogoHorario + params);
  }
}
