import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { FullComponent } from './layouts/full/full.component';
import { ContentComponent } from './layouts/content/content.component';

//Rutas
import { FULL_ROUTES } from './routes/full-layout.routes';
import { CONTENT_ROUTES } from './routes/content-layout.routes';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'inicio', component: InicioComponent },
  // { path: 'departamentos', component: TableDepartamentosComponent },
  // { path: 'corporaciones', component: TableCorporacionesComponent },
  // { path: 'catalogo-horarios', component: TableCatalogoHorariosComponent },
  // { path: 'puestos', component: TablePuestosComponent },
  // { path: 'empleados', component: TableEmpleadosComponent },
  // { path: 'asignar-horarios', component: TableHorarioEmpleadosComponent },
  // { path: 'asignar-horarios/empleado/:idEmpleado', component: HorariosPorEmpleadoComponent },
  // { path: 'asignar-horarios/empleado/:idEmpleado/registro-horario/:idHorarioEmpleado', component: AsignarHorarioComponent },
  { path: '', component: FullComponent, data: { title: 'full Views' }, children: FULL_ROUTES },
  { path: '', component: ContentComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
