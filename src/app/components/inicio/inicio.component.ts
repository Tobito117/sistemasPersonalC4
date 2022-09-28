import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  
  public items = [
    { label: 'Catálogo de horarios', icon: 'pi pi-fw pi-calendar', routerLink: '/catalogo-horarios' }, 
    { label: 'Corporaciones', icon: 'pi pi-fw pi-map',routerLink: '/corporaciones' },
    { label: 'Departamentos', icon: 'pi pi-fw pi-sitemap', routerLink: '/departamentos' },
    { label: 'Empleados', icon: 'pi pi-fw pi-user', routerLink: '/empleados' },
    { label: 'Personal', icon: 'pi pi-fw pi-user', routerLink: '/personal' },
    { label: 'Puestos', icon: 'pi pi-fw pi-briefcase', routerLink: '/puestos' },
    { label: 'Asignación de horarios', icon: 'pi pi-fw pi-calendar-plus', routerLink: '/asignar-horarios' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
