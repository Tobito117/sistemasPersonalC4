import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { DepartamentosService } from '../../../services/departamentos.service';
import { DepartamentoModel } from '../../../models/departamento.model';

@Component({
  selector: 'app-detalle-departamento',
  templateUrl: './detalle-departamento.component.html',
  styleUrls: ['./detalle-departamento.component.scss']
})
export class DetalleDepartamentoComponent implements OnInit {

  public idDepartamento: number;

  public departamento = new DepartamentoModel();

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _departamentosService: DepartamentosService
  ) { 
    this.idDepartamento = this.config.data.idDepartamento;
  }

  ngOnInit(): void {
    this.getDepartamento();
  }

  getDepartamento()
  {
    this._departamentosService.getDepartamento(this.idDepartamento).subscribe(
      response => {
        console.log(response);
        this.departamento = response.data;
      },
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
