import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { EmpleadosService } from '../../../services/empleados.service';
import { PuestosService } from '../../../services/puestos.service';
import { CorporacionesService } from '../../../services/corporaciones.service';
import { RecursosPagosService } from '../../../services/recursos-pagos.service';
import { GradosAcademicosService } from '../../../services/grados-academicos.service';
import { CarrerasService } from '../../../services/carreras.service';
import { EmpleadoModel } from '../../../models/empleado.model';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.scss']
})
export class DetalleEmpleadoComponent implements OnInit {

  public idEmpleado: number;

  public empleado = new EmpleadoModel();

  public nombrePuesto: string = '';
  public nombreCorporacion: string = '';
  public nombreRecursoPago: string = '';
  public nombreGradoAcademico: string = '';
  public nombreCarrera: string = '';

  constructor(
    public dialogRef: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private _puestosService: PuestosService,
    private _corporacionesService: CorporacionesService,
    private _recursosPagosService: RecursosPagosService,
    private _gradosAcademicosService: GradosAcademicosService,
    private _carrerasService: CarrerasService,
    private _empleadosService: EmpleadosService
  ) { 
    this.idEmpleado = this.config.data.idEmpleado;
  }

  ngOnInit(): void {
    this.getEmpleado();
    // this.getPuesto();
    // this.getCorporacion();
    // this.getRecursoPago();
    // this.getGradoAcademico();
    // this.getCarrera();
  }

  async getEmpleado()
  {
    await this._empleadosService.getEmpleado(this.idEmpleado).toPromise()
    .then(
      response => {
        console.log("1.-", response);
        this.empleado = response.data;

        //Obtiene los nombres de cada llave foránea que tenga el Empleado
        this.getPuesto();
        this.getCorporacion();
        this.getRecursoPago();
        this.getGradoAcademico();
        this.getCarrera();
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getPuesto()
  {
    await this._puestosService.getPuesto(this.empleado.fk_idPuesto).toPromise()
    .then(
      response => {
        this.nombrePuesto = response.data.nombre;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getCorporacion()
  {
    await this._corporacionesService.getCorporacion(this.empleado.fk_idCorporacion).toPromise()
    .then(
      response => {
        this.nombreCorporacion = response.data.nombre;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getRecursoPago()
  {
    await this._recursosPagosService.getRecursoPago(this.empleado.fk_idRecursoPago).toPromise()
    .then(
      response => {
        this.nombreRecursoPago = response.data.nombre;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getGradoAcademico()
  {
    await this._gradosAcademicosService.getGradoAcademico(this.empleado.fk_idGradoAcademico).toPromise()
    .then(
      response => {
        this.nombreGradoAcademico = response.data.nombre;
      }
    )
    .catch(
      error => {
        console.log(error);
      } 
    );
  }

  async getCarrera()
  {
    await this._carrerasService.getCarrera(this.empleado.fk_idCarrera).toPromise()
    .then(
      response => {
        this.nombreCarrera = response.data.nombre;
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
