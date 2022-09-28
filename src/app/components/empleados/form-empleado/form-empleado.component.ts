import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { EmpleadosService } from '../../../services/empleados.service';
import { PuestosService } from '../../../services/puestos.service';
import { CorporacionesService } from '../../../services/corporaciones.service';
import { RecursosPagosService } from '../../../services/recursos-pagos.service';
import { GradosAcademicosService } from '../../../services/grados-academicos.service';
import { CarrerasService } from '../../../services/carreras.service';
import { EmpleadoModel } from '../../../models/empleado.model';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss']
})
export class FormEmpleadoComponent implements OnInit {

  public empleadoForm!: FormGroup;

  public idEmpleado: number;
  
  public checked: boolean = false;

  public empleado = new EmpleadoModel();

  public selectRangoFechas: string = "1950:" + new Date().getFullYear();

  public estadosCiviles = [
    { nombre: 'Soltero' },
    { nombre: 'Casado' },
    { nombre: 'Divorciado' },
    { nombre: 'Unión libre' },
    { nombre: 'Viudo' },
    { nombre: 'Concubinato' },
  ];

  public generos = [
    { idGenero: 'H', nombre: 'Hombre' },
    { idGenero: 'M', nombre: 'Mujer' },
    { idGenero: 'O', nombre: 'Otro' },
  ];

  public puestos: any[] = [];
  public corporaciones: any[] = [];
  public recursosPagos: any[] = [];
  public gradosAcademicos: any[] = [];
  public carreras: any[] = [];

  constructor(
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef, 
    public dialogConfig: DynamicDialogConfig,
    private _empleadosService: EmpleadosService,
    private _puestosService: PuestosService,
    private _corporacionesService: CorporacionesService,
    private _recursosPagosService: RecursosPagosService,
    private _gradosAcademicosService: GradosAcademicosService,
    private _carrerasService: CarrerasService
  ) { 
    this.idEmpleado = this.dialogConfig.data.idEmpleado;
  }

  ngOnInit(): void {
    this.buildFormEmpleado();
    this.getEmpleado();
    this.getAllPuestos();
    this.getAllCorporaciones();
    this.getAllRecursosPagos();
    this.getAllGradosAcademicos();
    this.getAllCarreras();
  }

  async getEmpleado()
  {
    if (this.idEmpleado != undefined)
    {
      await this._empleadosService.getEmpleado(this.idEmpleado).toPromise()
      .then(
        response => {
          console.log("1.- ", response);

          this.empleado = response.data;

          //Cargamos los datos al formulario
          this.cargarDataAlFormulario();
        }
      )
      .catch(
        error => {
          console.log("Error getEmpleado -> ", error);
        }
      );
    }
  }

  async getAllPuestos()
  {
    await this._puestosService.getAllPuestos().toPromise()
    .then(
      response => {
        // console.log("2.- ", response);
        this.puestos = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getAllCorporaciones()
  {
    await this._corporacionesService.getAllCorporaciones().toPromise()
    .then(
      response => {
        // console.log("3.- ", response);
        this.corporaciones = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getAllRecursosPagos()
  {
    await this._recursosPagosService.getAllRecursosPagos().toPromise()
    .then(
      response => {
        // console.log("4.- ", response);
        this.recursosPagos = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getAllGradosAcademicos()
  {
    await this._gradosAcademicosService.getAllGradosAcademicos().toPromise()
    .then(
      response => {
        // console.log("5.- ", response);
        this.gradosAcademicos = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  getAllCarreras()
  {
    this._carrerasService.getAllCarreras().toPromise()
    .then(
      response => {
        // console.log("6.- ", response);
        this.carreras = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  buildFormEmpleado()
  {
    this.empleadoForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fk_idPuesto: ['', Validators.required],
      fk_idCorporacion: ['', Validators.required],
      fk_idRecursoPago: ['', Validators.required],
      fk_idGradoAcademico: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      fk_idCarrera: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      hijos: false,
      tipoSangre: '',
      cuip: '',
      curp: ['', Validators.required],
      rfc: ['', Validators.required],
      genero: ['', Validators.required],
      certificadoVacunacion: false,
      correo: ['', Validators.required],
      telefono: [null, Validators.required],
      domicilio: ['', Validators.required],
      vacaciones: ['', Validators.required],
    });
  }

  cargarDataAlFormulario()
  {
    this.empleadoForm.patchValue({
      nombre: this.empleado.nombre,
      apPaterno: this.empleado.apPaterno,
      apMaterno: this.empleado.apMaterno,
      fk_idPuesto: this.empleado.fk_idPuesto,
      fk_idCorporacion: this.empleado.fk_idCorporacion,
      fk_idRecursoPago: this.empleado.fk_idRecursoPago,
      fk_idGradoAcademico: this.empleado.fk_idGradoAcademico,
      estadoCivil: this.empleado.estadoCivil,
      fk_idCarrera: this.empleado.fk_idCarrera,
      fechaNacimiento: new Date(this.empleado.fechaNacimiento),
      hijos: this.empleado.hijos,
      tipoSangre: this.empleado.tipoSangre,
      cuip: this.empleado.cuip,
      curp: this.empleado.curp,
      rfc: this.empleado.rfc,
      genero: this.empleado.genero,
      certificadoVacunacion: this.empleado.certificadoVacunacion,
      correo: this.empleado.correo,
      telefono: this.empleado.numTelefonico,
      domicilio: this.empleado.domicilioCompleto,
      vacaciones: this.empleado.vacaciones,
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }

  saveEmpleado()
  {
    if (this.empleadoForm.invalid)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});

      return Object.values( this.empleadoForm.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) 
        {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } 
        else 
        {
          control.markAsTouched();
        }
      });
    }

    //Datos a enviar a la API
    this.empleado.nombre = this.empleadoForm.get('nombre')?.value;
    this.empleado.apPaterno = this.empleadoForm.get('apPaterno')?.value;
    this.empleado.apMaterno = this.empleadoForm.get('apMaterno')?.value;
    this.empleado.fk_idPuesto = this.empleadoForm.get('fk_idPuesto')?.value;
    this.empleado.fk_idCorporacion = this.empleadoForm.get('fk_idCorporacion')?.value;
    this.empleado.fk_idRecursoPago = this.empleadoForm.get('fk_idRecursoPago')?.value;
    this.empleado.fk_idGradoAcademico = this.empleadoForm.get('fk_idGradoAcademico')?.value;
    this.empleado.estadoCivil = this.empleadoForm.get('estadoCivil')?.value;
    this.empleado.fk_idCarrera = this.empleadoForm.get('fk_idCarrera')?.value;
    this.empleado.fechaNacimiento = this.empleadoForm.get('fechaNacimiento')?.value;
    this.empleado.hijos = this.empleadoForm.get('hijos')?.value;
    this.empleado.tipoSangre = this.empleadoForm.get('tipoSangre')?.value;
    this.empleado.cuip = this.empleadoForm.get('cuip')?.value;
    this.empleado.curp = this.empleadoForm.get('curp')?.value;
    this.empleado.rfc = this.empleadoForm.get('rfc')?.value;
    this.empleado.genero = this.empleadoForm.get('genero')?.value;
    this.empleado.certificadoVacunacion = this.empleadoForm.get('certificadoVacunacion')?.value;
    this.empleado.correo = this.empleadoForm.get('correo')?.value;
    this.empleado.numTelefonico = this.empleadoForm.get('telefono')?.value;
    this.empleado.domicilioCompleto = this.empleadoForm.get('domicilio')?.value;
    this.empleado.vacaciones = this.empleadoForm.get('vacaciones')?.value;

    console.log("EMPLEADO OBJECT ->", this.empleado);

    if (this.idEmpleado == undefined)
    {
      this._empleadosService.createEmpleado(this.empleado).subscribe(
        response => {
          console.log(response);

          //Cerramos el modal del formulario con valor 'CREATE-OK' para recargar la tabla principal
          this.dialogRef.close('CREATE-OK');
        },
        error => {
          console.log(error);
        }
      );
    }
    else
    {
      this._empleadosService.updateEmpleado(this.empleado).subscribe(
        response => {
          console.log(response);

          //Cerramos el modal del formulario con valor 'UPDATE-OK' para recargar la tabla principal
          this.dialogRef.close('UPDATE-OK');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  //--------------------------------- Validadores para el formulario ------------------------------------------------
  get nombreNoValido() {
    return this.empleadoForm.get('nombre')?.invalid && this.empleadoForm.get('nombre')?.touched;
  }

  get apPaternoNoValido() {
    return this.empleadoForm.get('apPaterno')?.invalid && this.empleadoForm.get('apPaterno')?.touched;
  }

  get apMaternoNoValido() {
    return this.empleadoForm.get('apMaterno')?.invalid && this.empleadoForm.get('apMaterno')?.touched;
  }

  get idPuestoNoValido() {
    return this.empleadoForm.get('fk_idPuesto')?.invalid && this.empleadoForm.get('fk_idPuesto')?.touched;
  }

  get idCorporacionNoValido() {
    return this.empleadoForm.get('fk_idCorporacion')?.invalid && this.empleadoForm.get('fk_idCorporacion')?.touched;
  }

  get idRecursoPagoNoValido() {
    return this.empleadoForm.get('fk_idRecursoPago')?.invalid && this.empleadoForm.get('fk_idRecursoPago')?.touched;
  }

  get idGradoAcademicoNoValido() {
    return this.empleadoForm.get('fk_idGradoAcademico')?.invalid && this.empleadoForm.get('fk_idGradoAcademico')?.touched;
  }

  get estadoCivilNoValido() {
    return this.empleadoForm.get('estadoCivil')?.invalid && this.empleadoForm.get('estadoCivil')?.touched;
  }

  get idCarreraNoValido() {
    return this.empleadoForm.get('fk_idCarrera')?.invalid && this.empleadoForm.get('fk_idCarrera')?.touched;
  }

  get curpNoValido() {
    return this.empleadoForm.get('curp')?.invalid && this.empleadoForm.get('curp')?.touched;
  }

  get rfcNoValido() {
    return this.empleadoForm.get('rfc')?.invalid && this.empleadoForm.get('rfc')?.touched;
  }

  get generoNoValido() {
    return this.empleadoForm.get('genero')?.invalid && this.empleadoForm.get('genero')?.touched;
  }
      
  get correoNoValido() {
    return this.empleadoForm.get('correo')?.invalid && this.empleadoForm.get('correo')?.touched;
  }

  get telefonoNoValido() {
    return this.empleadoForm.get('telefono')?.invalid && this.empleadoForm.get('telefono')?.touched;
  }

  get domicilioNoValido() {
    return this.empleadoForm.get('domicilio')?.invalid && this.empleadoForm.get('domicilio')?.touched;
  }

  get vacacionesNoValido() {
    return this.empleadoForm.get('vacaciones')?.invalid && this.empleadoForm.get('vacaciones')?.touched;
  }

}
