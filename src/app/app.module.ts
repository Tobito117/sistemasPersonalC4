import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//PrimeNg Modules
import { PrimeNGModule } from './primeng/primeng.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';

// //FullCalendarModule
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
]);

//Components
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableDepartamentosComponent } from './components/departamentos/table-departamentos/table-departamentos.component';
import { FormDepartamentoComponent } from './components/departamentos/form-departamento/form-departamento.component';
import { DetalleDepartamentoComponent } from './components/departamentos/detalle-departamento/detalle-departamento.component';
import { TableCorporacionesComponent } from './components/corporaciones/table-corporaciones/table-corporaciones.component';
import { FormCorporacionComponent } from './components/corporaciones/form-corporacion/form-corporacion.component';
import { DetalleCorporacionComponent } from './components/corporaciones/detalle-corporacion/detalle-corporacion.component';
import { TableCatalogoHorariosComponent } from './components/catalogo-horarios/table-catalogo-horarios/table-catalogo-horarios.component';
import { FormHorarioComponent } from './components/catalogo-horarios/form-horario/form-horario.component';
import { DetalleHorarioComponent } from './components/catalogo-horarios/detalle-horario/detalle-horario.component';
import { TablePuestosComponent } from './components/puestos/table-puestos/table-puestos.component';
import { DetallePuestoComponent } from './components/puestos/detalle-puesto/detalle-puesto.component';
import { FormPuestoComponent } from './components/puestos/form-puesto/form-puesto.component';
import { TableEmpleadosComponent } from './components/empleados/table-empleados/table-empleados.component';
import { FormEmpleadoComponent } from './components/empleados/form-empleado/form-empleado.component';
import { DetalleEmpleadoComponent } from './components/empleados/detalle-empleado/detalle-empleado.component';
import { TableHorarioEmpleadosComponent } from './components/horario-empleados/table-horario-empleados/table-horario-empleados.component';
import { DetalleHorarioEmpleadoComponent } from './components/horario-empleados/detalle-horario-empleado/detalle-horario-empleado.component';
import { FormHorarioEmpleadoComponent } from './components/horario-empleados/form-horario-empleado/form-horario-empleado.component';
import { AsignarHorarioComponent } from './components/horario-empleados/asignar-horario/asignar-horario.component';
import { HorariosPorEmpleadoComponent } from './components/horario-empleados/horarios-por-empleado/horarios-por-empleado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FullComponent } from './layouts/full/full.component';
import { ContentComponent } from './layouts/content/content.component';
import { HorarioGeneralComponent } from './components/horario-general/horario-general.component';
import { TableGuardiaNocturnaComponent } from './components/guardias/nocturna/table-guardia-nocturna/table-guardia-nocturna.component';
import { DetallePersonalComponent } from './components/personal/detalle-personal/detalle-personal.component';
import { FormPersonalComponent } from './components/personal/form-personal/form-personal.component';
import { TablePersonalComponent } from './components/personal/table-personal/table-personal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    TableDepartamentosComponent,
    FormDepartamentoComponent,
    DetalleDepartamentoComponent,
    TableCorporacionesComponent,
    FormCorporacionComponent,
    DetalleCorporacionComponent,
    TableCatalogoHorariosComponent,
    FormHorarioComponent,
    DetalleHorarioComponent,
    TablePuestosComponent,
    DetallePuestoComponent,
    FormPuestoComponent,
    TableEmpleadosComponent,
    FormEmpleadoComponent,
    DetalleEmpleadoComponent,
    TableHorarioEmpleadosComponent,
    DetalleHorarioEmpleadoComponent,
    FormHorarioEmpleadoComponent,
    AsignarHorarioComponent,
    HorariosPorEmpleadoComponent,
    InicioComponent,
    FullComponent,
    ContentComponent,
    HorarioGeneralComponent,
    TableGuardiaNocturnaComponent,
    FormPersonalComponent,
    DetallePersonalComponent,
    TablePersonalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    FullCalendarModule // register FullCalendar with you app
  ],
  providers: [
    ConfirmationService, 
    MessageService, 
    DialogService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
