import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { EmpleadosService } from '../../../services/empleados.service';
import { PuestosService } from '../../../services/puestos.service';
import { CorporacionesService } from '../../../services/corporaciones.service';
import { RecursosPagosService } from '../../../services/recursos-pagos.service';
import { GradosAcademicosService } from '../../../services/grados-academicos.service';
import { CarrerasService } from '../../../services/carreras.service';
import { PersonalService } from '../../../services/personal.service';
import { PersonalModel } from '../../../models/personal.model';


@Component({
  selector: 'app-detalle-personal',
  templateUrl: './detalle-personal.component.html',
  styleUrls: ['./detalle-personal.component.scss']
})
export class DetallePersonalComponent implements OnInit {
  public idPersonal: number;

  public personal = new PersonalModel();

  public nombrePuesto: string = '';
  public nombreCorporacion: string = '';
  public nombreRecursoPago: string = '';
  public nombreGradoAcademico: string = '';
  public nombreCarrera: string = '';

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _personalService: PersonalService,
    private _puestosService: PuestosService,
    private _corporacionesService: CorporacionesService,
    private _recursosPagosService: RecursosPagosService,
    private _gradosAcademicosService: GradosAcademicosService,
    private _carrerasService: CarrerasService,
    private _empleadosService: EmpleadosService
    ) {
      this.idPersonal = this.config.data.idPersonal;
     }

  ngOnInit(): void {
    this.getPersonal();
  }

  async getPersonal()
  {
    if (this.idPersonal != undefined)
    {
      await this._personalService.getPersonal(this.idPersonal).toPromise()
      .then(
        response => {
          console.log("1.- ", response);

          this.personal = response.data;

        }
      )
      .catch(
        error => {
          console.log("Error getPersonal -> ", error);
        }
      );
    }
  }

  closeModal()
  {
    this.dialogRef.close();
  }

}
