import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public items = [
    { label: 'Catálogo de horarios', icon: 'pi pi-fw pi-calendar', routerLink: '/catalogo-horarios' }, 
    { label: 'Corporaciones', icon: 'pi pi-fw pi-map',routerLink: '/corporaciones' },
    { label: 'Departamentos', icon: 'pi pi-fw pi-sitemap', routerLink: '/departamentos' },
    // { label: 'Empleados', icon: 'pi pi-fw pi-user', routerLink: '/empleados' },
    { label: 'Personal', icon: 'pi pi-fw pi-user', routerLink: '/personal' },
    { label: 'Puestos', icon: 'pi pi-fw pi-briefcase', routerLink: '/puestos' },
    { label: 'Asignación de horarios', icon: 'pi pi-fw pi-calendar-plus', routerLink: '/asignar-horarios' },
    { label: 'Horario general', icon: 'pi pi-fw pi-calendar-plus', items: [
      { label: 'Dirección Técnica', icon: 'pi pi-fw pi-calendar', routerLink: '/horario-general' },
      { label: 'Dirección Operativa', icon: 'pi pi-fw pi-calendar' },
      { label: 'Dirección Administrativa', icon: 'pi pi-fw pi-calendar' }
    ]},
    { label: 'Guardias', icon: 'pi pi-fw pi-shield',  items: [
      { label: 'CALLE 911', icon: 'pi pi-fw pi-users' },
      { label: 'Ciudadano Vigilante', icon: 'pi pi-fw pi-users' },
      { label: 'Nocturna', icon: 'pi pi-fw pi-moon', routerLink: '/guardia-nocturna' },
    ]},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
