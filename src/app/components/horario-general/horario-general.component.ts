import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-horario-general',
  templateUrl: './horario-general.component.html',
  styleUrls: ['./horario-general.component.scss']
})
export class HorarioGeneralComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  //Prueba
  customers!: any[];
  statuses!: any[];
  representatives!: {myLabel: string, myValue: string}[];

  loading: boolean = true;

  // public departamentos = [
  //   {name: 'Sistemas'},
  //   {name: 'Redes'},
  //   {name: 'Radio'},
  //   {name: 'Video'},
  //   {name: 'Ciudadano Vigilante'},
  //   {name: 'Telecomunicaciones'},
  // ];

  public departamentos = [
    { label: "Sistemas", value: "Sistemas" },
    { label: "Redes", value: "Redes" },
    { label: "Radio", value: "Radio" },
    { label: "Video", value: "Video" },
    { label: "Ciudadano Vigilante", value: "Ciudadano Vigilante" },
    { label: "Telecomunicaciones", value: "Telecomunicaciones" }
  ];

  public datosHorario = [
    {
      departamento: 'Sistemas', 
      nombre: 'Miguel Angel López Luciano', 
      puesto: 'Jefe', 
      dias: [
        { nombreDia: 'L', dia: 1, clave: '3', color: 'orange' },
        { nombreDia: 'M', dia: 2, clave: '3', color: 'orange' },
        { nombreDia: 'M', dia: 3, clave: '3', color: 'orange' },
        { nombreDia: 'J', dia: 4, clave: '3', color: 'orange' },
        { nombreDia: 'V', dia: 5, clave: '3', color: 'orange' },
        { nombreDia: 'S', dia: 6, clave: '3', color: 'orange' },
        { nombreDia: 'D', dia: 7, clave: '3', color: 'orange' },
        { nombreDia: 'L', dia: 8, clave: '3', color: 'orange' },
        { nombreDia: 'M', dia: 9, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 10, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 11, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 12, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 13, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 14, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 15, clave: 'T50', color: 'green' },
        { nombreDia: 'M', dia: 16, clave: 'T50', color: 'green' },
        { nombreDia: 'M', dia: 17, clave: 'T50', color: 'green' },
        { nombreDia: 'J', dia: 18, clave: 'T50', color: 'green' },
        { nombreDia: 'V', dia: 19, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 20, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 21, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 22, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 23, clave: 'T50', color: 'brown' },
        { nombreDia: 'M', dia: 24, clave: 'T50', color: 'brown' },
        { nombreDia: 'J', dia: 25, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 26, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 27, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 28, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 29, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 30, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 31, clave: 'T50', color: 'red' },
      ]
    },
    {
      departamento: 'Redes', 
      nombre: 'Enrique Alejo López', 
      puesto: 'Esclavo 1', 
      dias: [
        { nombreDia: 'L', dia: 1, clave: 'D', color: 'green' },
        { nombreDia: 'M', dia: 2, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 3, clave: 'T50', color: 'gray' },
        { nombreDia: 'J', dia: 4, clave: 'T50', color: 'gray' },
        { nombreDia: 'V', dia: 5, clave: 'T50', color: 'gray' },
        { nombreDia: 'S', dia: 6, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 7, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 8, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 9, clave: 'T50', color: 'blue' },
        { nombreDia: 'M', dia: 10, clave: 'T50', color: 'blue' },
        { nombreDia: 'J', dia: 11, clave: 'T50', color: 'blue' },
        { nombreDia: 'V', dia: 12, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 13, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 14, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 15, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 16, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 17, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 18, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 19, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 20, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 21, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 22, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 23, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 24, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 25, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 26, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 27, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 28, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 29, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 30, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 31, clave: 'T50', color: 'red' },
      ]
    },
    {
      departamento: 'Sistemas', 
      nombre: 'Alejandro Salvador Real', 
      puesto: 'Esclavo 2', 
      dias: [
        { nombreDia: 'L', dia: 1, clave: 'T11', color: 'gray' },
        { nombreDia: 'M', dia: 2, clave: '3', color: 'brown' },
        { nombreDia: 'M', dia: 3, clave: '3', color: 'brown' },
        { nombreDia: 'J', dia: 4, clave: '3', color: 'brown' },
        { nombreDia: 'V', dia: 5, clave: '3', color: 'brown' },
        { nombreDia: 'S', dia: 6, clave: '3', color: 'brown' },
        { nombreDia: 'D', dia: 7, clave: '3', color: 'brown' },
        { nombreDia: 'L', dia: 8, clave: '3', color: 'brown' },
        { nombreDia: 'M', dia: 9, clave: '3', color: 'brown' },
        { nombreDia: 'M', dia: 10, clave: '3', color: 'brown' },
        { nombreDia: 'J', dia: 11, clave: '3', color: 'brown' },
        { nombreDia: 'V', dia: 12, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 13, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 14, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 15, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 16, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 17, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 18, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 19, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 20, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 21, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 22, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 23, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 24, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 25, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 26, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 27, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 28, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 29, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 30, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 31, clave: 'T50', color: 'red' },
      ]
    },
    {
      departamento: 'Sistemas', 
      nombre: 'Persona 1', 
      puesto: 'Esclavo 3', 
      dias: [
        { nombreDia: 'L', dia: 1, clave: 'D', color: 'green' },
        { nombreDia: 'M', dia: 2, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 3, clave: 'T50', color: 'gray' },
        { nombreDia: 'J', dia: 4, clave: 'T50', color: 'gray' },
        { nombreDia: 'V', dia: 5, clave: 'T50', color: 'gray' },
        { nombreDia: 'S', dia: 6, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 7, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 8, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 9, clave: 'T50', color: 'blue' },
        { nombreDia: 'M', dia: 10, clave: 'T50', color: 'blue' },
        { nombreDia: 'J', dia: 11, clave: 'T50', color: 'blue' },
        { nombreDia: 'V', dia: 12, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 13, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 14, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 15, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 16, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 17, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 18, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 19, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 20, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 21, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 22, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 23, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 24, clave: 'T50', color: 'red' },
        { nombreDia: 'J', dia: 25, clave: 'T50', color: 'red' },
        { nombreDia: 'V', dia: 26, clave: 'T50', color: 'red' },
        { nombreDia: 'S', dia: 27, clave: 'T50', color: 'red' },
        { nombreDia: 'D', dia: 28, clave: 'T50', color: 'red' },
        { nombreDia: 'L', dia: 29, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 30, clave: 'T50', color: 'red' },
        { nombreDia: 'M', dia: 31, clave: 'T50', color: 'red' },
      ]
    },
  ];


  public labelsDiasSemana: any[] = [];
  public labelsNombresDiasSemana: any[] = [];

  constructor() { }

  ngOnInit(): void {

    


    for (let item of this.datosHorario[0].dias)
    {
      this.labelsDiasSemana.push(item.dia);
      this.labelsNombresDiasSemana.push(item.nombreDia);
      console.log("LABELS dias de la semana -> ", this.labelsDiasSemana);
    }


  }

}
