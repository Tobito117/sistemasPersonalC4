import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { PuestosService } from '../../../services/puestos.service';
import { DepartamentosService } from '../../../services/departamentos.service';
import { PuestoModel } from '../../../models/puesto.model';

@Component({
  selector: 'app-detalle-puesto',
  templateUrl: './detalle-puesto.component.html',
  styleUrls: ['./detalle-puesto.component.scss']
})
export class DetallePuestoComponent implements OnInit {

  public idPuesto: number;

  public puesto = new PuestoModel();
  public departamentos: any[] = [];
  public nombreDepartamento: string | undefined;

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _puestosService: PuestosService,
    private _departamentosService: DepartamentosService
  ) { 
    this.idPuesto = this.config.data.idPuesto;
  }

  ngOnInit(): void {
    this.getPuesto();
  }

  async getPuesto()
  {
    await this._puestosService.getPuesto(this.idPuesto).toPromise()
    .then(
      response => {
        console.log(response);
        this.puesto = response.data;

        //Llama al método para consultar todos los departamentos
        this.getAllDepartamentos();
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getAllDepartamentos()
  {
    await this._departamentosService.getAllDepartamentos().toPromise()
    .then(
      response => {
        console.log(response);
        this.departamentos = response.data;

        //Buscamos el departamento que pertenezca al 'fk_idDepartamento'
        const foundDepartamento = this.departamentos.find(result => result.idDepartamento == this.puesto.fk_idDepartamento);

        //Reemplazamos el 'fk_idDepartamwento' ´por el nombre del departamento
        this.nombreDepartamento = this.puesto.fk_idDepartamento?.toString().replace(this.puesto.fk_idDepartamento.toString(), foundDepartamento.nombre);
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  closeModal()
  {
    this.dialogRef.close();
  }

}
