import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public itemsNavbar = [
    { nombre: 'Catálogo de horarios', icon: 'pi pi-fw pi-calendar', url: '/catalogo-horarios' }, 
    { nombre: 'Corporaciones', icon: 'pi pi-fw pi-map',url: '/corporaciones' },
    { nombre: 'Departamentos', icon: 'pi pi-fw pi-sitemap', url: '/departamentos' },
    { nombre: 'Empleados', icon: 'pi pi-fw pi-user', url: '/empleados' },
    { nombre: 'Personal', icon: 'pi pi-fw pi-user', url: '/personal' },
    { nombre: 'Puestos', icon: 'pi pi-fw pi-briefcase', url: '/puestos' },
    { nombre: 'Asignación de horarios', icon: 'pi pi-fw pi-calendar-plus', url: '/asignar-horarios' },
  ];

  public itemsUsuario = [
    {
      label: 'Administracion',
      items: [
        { label: 'Cerrar sesión', icon: 'pi pi-fw pi-power-off', routerLink: '/login' }
      ]
    }
  ];

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  logout()
  {
    this._router.navigate(['/login']);
  }

}
