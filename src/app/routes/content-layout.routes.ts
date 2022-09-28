import { Routes } from '@angular/router';
import { TableCatalogoHorariosComponent } from '../components/catalogo-horarios/table-catalogo-horarios/table-catalogo-horarios.component';
import { TableCorporacionesComponent } from '../components/corporaciones/table-corporaciones/table-corporaciones.component';
import { TableDepartamentosComponent } from '../components/departamentos/table-departamentos/table-departamentos.component';
import { TableEmpleadosComponent } from '../components/empleados/table-empleados/table-empleados.component';
import { TableGuardiaNocturnaComponent } from '../components/guardias/nocturna/table-guardia-nocturna/table-guardia-nocturna.component';
import { AsignarHorarioComponent } from '../components/horario-empleados/asignar-horario/asignar-horario.component';
import { HorariosPorEmpleadoComponent } from '../components/horario-empleados/horarios-por-empleado/horarios-por-empleado.component';
import { TableHorarioEmpleadosComponent } from '../components/horario-empleados/table-horario-empleados/table-horario-empleados.component';
import { HorarioGeneralComponent } from '../components/horario-general/horario-general.component';
import { TablePuestosComponent } from '../components/puestos/table-puestos/table-puestos.component';
import { TablePersonalComponent } from '../components/personal/table-personal/table-personal.component';

//Rutas para el contenido 
export const CONTENT_ROUTES: Routes = [
  { path: 'departamentos', component: TableDepartamentosComponent },
  { path: 'corporaciones', component: TableCorporacionesComponent },
  { path: 'catalogo-horarios', component: TableCatalogoHorariosComponent },
  { path: 'puestos', component: TablePuestosComponent },
  { path: 'empleados', component: TableEmpleadosComponent },
  { path: 'personal', component: TablePersonalComponent},
  { path: 'asignar-horarios', component: TableHorarioEmpleadosComponent },
  { path: 'asignar-horarios/empleado/:idEmpleado', component: HorariosPorEmpleadoComponent },
  { path: 'asignar-horarios/empleado/:idEmpleado/registro-horario/:idHorarioEmpleado', component: AsignarHorarioComponent },
  { path: 'horario-general', component: HorarioGeneralComponent },
  { path: 'guardia-nocturna', component: TableGuardiaNocturnaComponent },
];