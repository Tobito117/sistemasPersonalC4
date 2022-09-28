import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-guardia-nocturna',
  templateUrl: './table-guardia-nocturna.component.html',
  styleUrls: ['./table-guardia-nocturna.component.scss']
})
export class TableGuardiaNocturnaComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  prueba = [
    {nombre: 'Miguel Angel López Luciano', departamento: 'Sistemas', fecha: '2022-03-01'},
    {nombre: 'Enrique Alejo López', departamento: 'Redes', fecha: '2022-03-02'},
    {nombre: 'Persona 3', departamento: 'Radiocomunicaciones', fecha: '2022-03-03'},
    {nombre: 'Persona 4', departamento: 'Videovigilancia', fecha: '2022-03-04'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  //Filtra los datos de la tabla
  filterGlobalTable(event: any, stringValue: any)
  {
    this.datatable?.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
