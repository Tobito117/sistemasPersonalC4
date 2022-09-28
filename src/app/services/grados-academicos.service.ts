import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GradosAcademicosService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllGradosAcademicos():Observable<any>
  {
    return this._http.get(this.baseUrl + '/GradosAcademicos');
  }

  getGradoAcademico(idGradoAcademico: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/GradosAcademicos/' + idGradoAcademico)
  }
}
