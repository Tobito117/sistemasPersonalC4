import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; //Importación de FullCalendar, debe de ir primero antes de todas las importaciones
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import { CatalogoHorariosService } from '../../../services/catalogo-horarios.service';
import { HorariosEmpleadoService } from '../../../services/horarios-empleado.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { CatalogoHorarioModel } from '../../../models/catalogo-horario.model';
import { EmpleadoModel } from '../../../models/empleado.model';
import { HorarioEmpleadoModel } from '../../../models/horario-empleado.model';

@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrls: ['./asignar-horario.component.scss']
})
export class AsignarHorarioComponent implements OnInit {

  @ViewChild('external') external!: ElementRef; //Eventos arrastables (Catálogo de horarios)
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent

  public calendarOptions: CalendarOptions = {}

  public horarioDelEmpleado = new HorarioEmpleadoModel();

  public catalogoHorarios: CatalogoHorarioModel[] = [];

  public empleado = new EmpleadoModel();

  public datosHorarioEmpleado: any[] = [];

  public idEmpleado!: number;

  public loading!: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _catalogoHorariosService: CatalogoHorariosService,
    private _horariosEmpleadoService: HorariosEmpleadoService,
    private _empleadosService: EmpleadosService
  ) { 
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.getAllCatalogoHorarios();
    this.getEmpleado();
    this.getHorarioEmpleado();
    this._route.params.subscribe(
      params => {
        this.idEmpleado = params['idEmpleado'];
      }
    );
  }

  ngAfterViewInit() 
  {
    //Elementos a arrastrar
    new Draggable(this.external.nativeElement, {
      itemSelector: '.horario',
      eventData: function(eventElement) {
        // console.log("Event Arrastrado-> ", eventElement);
        return {
          id: uuidv4(),
          // sourceId: eventElement.children[0].classList[1],
          idCatalogoHorario: eventElement.children[0].classList[1],
          title: eventElement.innerText,
          backgroundColor: eventElement.children[0].classList[0]
        };
      }
    });
  }

  getAllCatalogoHorarios()
  {
    this._catalogoHorariosService.getAllCatalogoHorarios().subscribe(
      response => {
        console.log(response);
        this.catalogoHorarios = response.data;

        //Buscamos el índice del horario de la guardia nocturna, en el arreglo 'catalogoHorarios'
        let indexHorarioGuardiaNocturna = this.catalogoHorarios.findIndex((item) => item.descripcion == 'HORARIO DE 19:00 A 07:00 HORAS');

        //Eliminamos el elemento en base al index encontrado anteriormente
        this.catalogoHorarios.splice(indexHorarioGuardiaNocturna, 1);
      },
      error => {
        console.log(error);
      }
    );
  }

  getEmpleado()
  {
    this._route.params.subscribe(params => {
      this._empleadosService.getEmpleado(params['idEmpleado']).subscribe(
        response => {
          console.log(response);
          this.empleado = response.data;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  getHorarioEmpleado()
  {
    this._route.params.subscribe(params => {
      this._horariosEmpleadoService.getHorarioEmpleado(params['idHorarioEmpleado']).subscribe(
        response => {
          console.log(response);
          this.horarioDelEmpleado = response.data;

          //Crea una instancia del API de FullCalendar para utilizar los métodos de FullCalendar
          let calendarApi = this.calendarComponent.getApi();

          //Asignamos el mes y año correspondiente que venga de la base de datos (Ejemplo: 2022-01-01)
          let fechaCalendario = this.horarioDelEmpleado.anio + '-' + this.horarioDelEmpleado.mes + '-01';
          calendarApi.changeView('dayGridMonth', fechaCalendario);

          //Si el campo 'datosHorario' no viene vacío
          if (response.data.datosHorario != "")
          {
            //Convierte los 'datosHorarioEmpleado' a un arreglo de objetos
            this.datosHorarioEmpleado = JSON.parse(response.data.datosHorario);

            //Recorremos el arreglo 'datosHorarioEmpleado'
            for (let item of this.datosHorarioEmpleado)
            {
              //Creamos dos variables locales para almacenar los campos 'start' y 'end' como tipo Date()
              let inicio = new Date(item.start);
              let fin = new Date(item.end);

              //Por cada objeto recorrido, seteamos un día más a cada fecha 'start' y 'end' (para que el calendario asigne correctamente las fechas que se recuperan de la BD)
              item.start = inicio.setDate(inicio.getDate() + 1);
              item.end = fin.setDate(fin.getDate() + 1);
            }
          }

          //Llamamos al método 'calendarSettings()' para aplicar la configuración del calendario
          this.calendarSettings();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  calendarSettings()
  {
    var anio = Number(this.horarioDelEmpleado.anio);
    var mes = Number(this.horarioDelEmpleado.mes);

    //Obtenemos los días que contiene el mes que viene en la BD
    var diasMes = new Date(anio, mes, 0).getDate() + 1;

    //Opciones para calendario
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [interactionPlugin],
      editable: true,
      droppable: true,
      eventOverlap: false,
      locale: 'es',
      eventClick: (info) => {
        //SourceId es el idCatalogoHorario (id 8 = HORARIO DE 19:00 A 7:00 - GUARDIA NOCTURNA)
        //Evita que se dé clic cuando el día esté asignado a un horario de guardia nocturna
        //Si el horario asignado no es igual a un horario de guardia nocturna, permite dar clic para eliminar el horario del calendario
        if (info.event._def.title != '2 - HORARIO DE 19:00 A 07:00 HORAS')
        {
          this.confirmationDeleteEvent(info.event.id);
        }
      },
      // events: [
        // { id: '1', title: 'Evento de prueba', start: new Date().setDate(inicio.getDate() + 1), end: new Date().setDate(fin.getDate() + 1), allDay: true},
        // { id: 'b', title: 'Evento de prueba 2', start: '2022-01-20', end: '2022-01-24T07:00:00.000Z', allDay: true}
      // ],
      events: this.datosHorarioEmpleado,
      eventConstraint: { //eventConstraint = Permite un rango de fechas hábiles en el calendario
        //Asignamos mes y anio que vengan de la BD como fecha inicial
        start: this.horarioDelEmpleado.anio + '-' + this.horarioDelEmpleado.mes + '-01',

        //Asignamos los días del mes para que sea la fecha final del mes en el que se pueda arrastrar elementos al calendario
        end: this.horarioDelEmpleado.anio + '-' + this.horarioDelEmpleado.mes + '-' + diasMes.toString()
      },
      drop: () => { }
    };
  }

  confirmationDeleteEvent(idEvento: any)
  {
    //Crea una instancia del API de FullCalendar para utilizar los métodos de FullCalendar
    let calendarApi = this.calendarComponent.getApi();

    //Obtiene el Id del evento seleccionado
    let event = calendarApi.getEventById(idEvento);

    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este horario del calendario?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        //Invoca el método 'Remover' para eliminar el evento seleccionado
        event?.remove();

        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Horario eliminado correctamente', life: 3000});
      }
    });
  }

  deleteAllEvents()
  {
    //Crea una instancia del API de FullCalendar para utilizar los métodos de FullCalendar
    const calendarApi = this.calendarComponent.getApi();

    //Obtiene todos los elementos que estén en el calendario
    const eventSources = calendarApi.getEvents();

    if (eventSources.length > 0)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de eliminar TODOS los datos del mes del calendario?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          //Recorre todos los elementos del calendario
          for (let item of eventSources)
          {
            //Elimina cada evento del calendario
            item.remove();
          }
  
          this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos eliminados correctamente', life: 3000});
        }
      });
    }
  }

  saveHorario()
  {
    this.loading = true;
    this.convertEventsCalendarioToJSON();

    this._horariosEmpleadoService.updateHorarioEmpleado(this.horarioDelEmpleado).subscribe(
      response => {
        console.log(response);
        this.loading = false;
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos del horario guardados correctamente', life: 3000});
        
        setTimeout(() => {
          this._router.navigate(['//asignar-horarios/empleado', this.idEmpleado]);
        }, 3000);
      },
      error => {
        console.log(error);
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al guardar los datos del horario', life: 3000});
      }
    );
  }

  changeViewPrueba()
  {
    let calendarApi = this.calendarComponent.getApi(); //Crea una instancia del API de FullCalendar para utilizar los métodos de FullCalendar
    calendarApi.changeView('dayGridMonth', '2017-06-01');
  }

  convertEventsCalendarioToJSON()
  {
    //Crea una instancia del API de FullCalendar para utilizar los métodos de FullCalendar
    let calendarApi = this.calendarComponent.getApi();

    //Obtiene todos los elementos que estén en el calendario
    let eventSources = calendarApi.getEvents();

    var eventosArray = [];

    for (let item of eventSources)
    {
      //Creamos el objeto con los datos del evento que estén en el calendario
      var evento = {
        id: item._def.publicId,
        idCatalogoHorario: item._def.extendedProps.idCatalogoHorario,
        title: item._def.title,
        allDay: true,
        overlap: true,
        editable: true,
        color: item._def.ui.backgroundColor,
        start: item._instance?.range.start,
        end: item._instance?.range.end,
      }

      //Si el 'idCatalogoHorario' es igual a '11' (Pertenece al horario de guardia nocturna)
      if (item._def.extendedProps.idCatalogoHorario == '11')
      {
        //Evita que se pueda arrastrar y editar el horario en la casilla que esté almacenada
        evento.overlap = false;
        evento.editable = false;
      }

      eventosArray.push(evento);

      //Convertimos los datos del arreglo en formato JSON
      var arrayJSON =  JSON.stringify(eventosArray);

      //Asignamos el arreglo en formato JSON a los datos del horario del Empleado
      this.horarioDelEmpleado.datosHorario = arrayJSON;
    }
  }

}
