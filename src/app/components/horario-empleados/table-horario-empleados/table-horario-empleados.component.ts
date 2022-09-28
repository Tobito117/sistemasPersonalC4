import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

import { EmpleadosService } from '../../../services/empleados.service';
import { EmpleadoModel } from '../../../models/empleado.model';

import { AsignarHorarioComponent } from '../asignar-horario/asignar-horario.component';

@Component({
  selector: 'app-table-horario-empleados',
  templateUrl: './table-horario-empleados.component.html',
  styleUrls: ['./table-horario-empleados.component.scss']
})
export class TableHorarioEmpleadosComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  public empleados: EmpleadoModel[] = [];

  constructor(
    public dialogService: DialogService,
    private _empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.getAllEmpleados();
  }

  //Filtra los datos de la tabla
  filterGlobalTable(event: any, stringValue: any)
  {
    this.datatable?.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllEmpleados()
  {
    this._empleadosService.getAllEmpleados().subscribe(
      response => {
        console.log(response);
        this.empleados = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  showModalAsignarHorario(nombreEmpleado: string, apPaternoEmpleado: string, apMaternoEmpleado: string)
  {
    const fullNameEmpleado = nombreEmpleado + ' ' + apPaternoEmpleado + ' ' + apMaternoEmpleado;
    this.dialogRef = this.dialogService.open(AsignarHorarioComponent, {
      data: {
        // idPuesto: pIdPuesto
      },
      header: 'Horario para ' + fullNameEmpleado,
      width: '50vw',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

}
