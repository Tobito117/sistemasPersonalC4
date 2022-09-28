import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Global } from './global';

import { PersonalModel } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  public baseUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseUrl = Global.url;
  }

  getAllPersonal():Observable<any>
  {
    return this._http.get(this.baseUrl + '/Personal');
  }

  getPersonal(idPersonal: number):Observable<any>
  {
    return this._http.get(this.baseUrl + '/Personal/' + idPersonal);
  }

  createPersonal(personal: PersonalModel):Observable<any>
  {
    return this._http.post(this.baseUrl + '/Personal', personal);
  }

  updatePersonal(personal: PersonalModel):Observable<any>
  {
    const body = {
      ...personal
    }

    return this._http.put(this.baseUrl + '/Personal', personal);
  }

  updateEstatusPersonal(idPersonal: number, fk_status: boolean):Observable<any>
  {
    const params = '?fk_status=' + fk_status;
    return this._http.delete(this.baseUrl + '/personal' + '/status/' + idPersonal + params);
  }
}
