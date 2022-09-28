import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { CorporacionesService } from '../../../services/corporaciones.service';
import { CorporacionModel } from '../../../models/corporacion.model';

@Component({
  selector: 'app-detalle-corporacion',
  templateUrl: './detalle-corporacion.component.html',
  styleUrls: ['./detalle-corporacion.component.scss']
})
export class DetalleCorporacionComponent implements OnInit {

  public idCorporacion: number;

  public corporacion = new CorporacionModel();

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _corporacionesService: CorporacionesService
  ) {
    this.idCorporacion = this.config.data.idCorporacion;
  }

  ngOnInit(): void {
    this.getCorporacion();
  }

  getCorporacion()
  {
    this._corporacionesService.getCorporacion(this.idCorporacion).subscribe(
      response => {
        console.log(response);
        this.corporacion = response.data;
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
