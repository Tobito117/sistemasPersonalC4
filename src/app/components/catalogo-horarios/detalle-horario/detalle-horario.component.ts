import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { CatalogoHorariosService } from '../../../services/catalogo-horarios.service';
import { CatalogoHorarioModel } from '../../../models/catalogo-horario.model';

@Component({
  selector: 'app-detalle-horario',
  templateUrl: './detalle-horario.component.html',
  styleUrls: ['./detalle-horario.component.scss']
})
export class DetalleHorarioComponent implements OnInit {

  public idCatalogoHorario: number;

  public horario = new CatalogoHorarioModel();

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _catalogoHorariosService: CatalogoHorariosService
  ) { 
    this.idCatalogoHorario = this.config.data.idCatalogoHorario;
  }

  ngOnInit(): void {
    this.getHorario();
  }

  getHorario()
  {
    this._catalogoHorariosService.getHorario(this.idCatalogoHorario).subscribe(
      response => {
        console.log(response);
        this.horario = response.data;
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
