import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { HorariosEmpleadoService } from '../../../services/horarios-empleado.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { HorarioEmpleadoModel, HorarioEmpleadoTemporalModel } from '../../../models/horario-empleado.model';
import { EmpleadoModel } from '../../../models/empleado.model';

@Component({
  selector: 'app-horarios-por-empleado',
  templateUrl: './horarios-por-empleado.component.html',
  styleUrls: ['./horarios-por-empleado.component.scss']
})
export class HorariosPorEmpleadoComponent implements OnInit {

  public horariosDelEmpleado: HorarioEmpleadoModel[] = [];
  public horarioTemp: HorarioEmpleadoTemporalModel[] = [];

  public empleado = new EmpleadoModel();

  public idEmpleado!: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _empleadosService: EmpleadosService,
    private _horariosEmpleadoService: HorariosEmpleadoService,
    
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.idEmpleado = params['idEmpleado'];
      }
    );

    this.getEmpleado();
    this.getHorarioByIdEmpleado();
  }

  getEmpleado()
  {
    this._empleadosService.getEmpleado(this.idEmpleado).subscribe(
      response => {
        console.log(response);
        this.empleado = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getHorarioByIdEmpleado()
  {
    this._horariosEmpleadoService.getHorarioEmpleadoByIdEmpleado(this.idEmpleado).subscribe(
      response => {
        console.log(response);
        this.horariosDelEmpleado = response.data;

        this.setHorariosByYear();
      },
      error => {
        console.log(error);
      }
    );
  }

  setMesById(idMes: string)
  {
    switch (idMes)
    {
      case '01': { return "Enero"; }
      case '02': { return "Febrero"; }
      case '03': { return "Marzo"; }
      case '04': { return "Abril"; }
      case '05': { return "Mayo"; }
      case '06': { return "Junio"; }
      case '07': { return "Julio"; }
      case '08': { return "Agosto"; }
      case '09': { return "Septiembre"; }
      case '10': { return "Octubre"; }
      case '11': { return "Noviembre"; }
      case '12': { return "Diciembre"; }
      default: { return null; }
    } 
  }

  setHorariosByYear()
  {
    //1. Encontrar los años y guardarlos en un arreglo
    for (let item of this.horariosDelEmpleado)
    {
      //Creamos un nuevo objeto de tipo 'HorarioEmpleadoTemporal'
      const datosByYear = new HorarioEmpleadoTemporalModel();
      const yaExisteAnio = this.horarioTemp.findIndex(
        (result) => result.anio == item.anio
      );

      if(yaExisteAnio == -1)
      {
        datosByYear.anio = item.anio;
        this.horarioTemp.push(datosByYear);
      }
    }

    //2. Filtrar los elementos por año
    for (let item of this.horarioTemp)
    {
      //Filtramos los meses que coincidan con el año que se está recorriendo
      let foundMeses = this.horariosDelEmpleado.filter(result => result.anio == item.anio);

      //Asignamos los meses que coincidan con el año que se está recorriendo
      item.meses = foundMeses;
    }
    
    //3. Ordenar los anios de menor a mayor
    this.horarioTemp.sort((a,b) => {
      if (a.anio < b.anio)
      return -1;
      if (a.anio > b.anio)
        return 1;
      return 0;
    });

    console.log("HORARIO TEMP -> ", this.horarioTemp);
  }

  disableHorarioEmpleado(idHorarioEmpleado: any, estatus: any, event: MouseEvent)
  {
    console.log("idHorarioEmpleado", idHorarioEmpleado);
    console.log("estatus", estatus);

    event.stopPropagation();

    let messageQuestion;
    let messageSuccessToast;

    if (estatus)
    {
      messageQuestion = '¿Está seguro de deshabilitar el horario de este mes?';
    }
    else
    {
      messageQuestion = '¿Está seguro de habilitar el horario de este mes?';
    }

    this.confirmationService.confirm({
      message: messageQuestion,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this._horariosEmpleadoService.updateEstatusHorarioEmpleado(idHorarioEmpleado, estatus).subscribe(
          response => {
            console.log(response);

            if (response.data.estatus)
            {
              messageSuccessToast = 'Horario del mes habilitado correctamente';
            }
            else
            {
              messageSuccessToast = 'Horario del mes deshabilitado correctamente';
            }

            this.getHorarioByIdEmpleado();
            this.messageService.add({severity:'success', summary: 'Correcto', detail: messageSuccessToast, life: 3000});
          },
          error => {
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al deshabilitar el horario del mes', life: 3000});
          }
        );
      }
    });



    
  }

}
