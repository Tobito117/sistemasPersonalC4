import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';



import { EmpleadosService } from '../../../services/empleados.service';
import { PuestosService } from '../../../services/puestos.service';
import { CorporacionesService } from '../../../services/corporaciones.service';
import { RecursosPagosService } from '../../../services/recursos-pagos.service';
import { GradosAcademicosService } from '../../../services/grados-academicos.service';
import { CarrerasService } from '../../../services/carreras.service';
import { PersonalService } from '../../../services/personal.service';
import { PersonalModel } from '../../../models/personal.model';

@Component({
  selector: 'app-form-personal',
  templateUrl: './form-personal.component.html',
  styleUrls: ['./form-personal.component.scss']
})
export class FormPersonalComponent implements OnInit {

  public personalForm!: FormGroup;

  public idPersonal: number;
  
  public checked: boolean = false;

  public loading: boolean = false;

  public personal = new PersonalModel();

  public selectRangoFechas: string = "1950:" + new Date().getFullYear();

  public estadosCiviles = [
    { nombre: 'SOLTERO (A)' },
    { nombre: 'CASADO (A)' },
    { nombre: 'DIVORCIADO (A)' },
    { nombre: 'UNION LIBRE' },
    { nombre: 'VIUDO (A)' },
    { nombre: 'CONCUBINATO (A)' },
  ];

  public generos = [
    { idGenero: 'HOMBRE', nombre: 'HOMBRE' },
    { idGenero: 'MUJER', nombre: 'MUJER' },
    { idGenero: 'OTRO', nombre: 'Otro' },
  ];

  public Pestatus = [
    { idPestatus: 'ALTA', nombre: '001' },
    { idPestatus: 'BAJA', nombre: '002' },
    { idPestatus: 'COMISIONADO', nombre: '001' },
    { idPestatus: 'PERMISO', nombre: '001' },
    { idPestatus: 'VACACIONES', nombre: '001' },
    { idPestatus: 'MATERNIDAD', nombre: '001' },
  ];

  public pClaveTipoContrato = [
    { idClaveTipCon: 'BASE', nombre: '001' },
    { idClaveTipCon: 'HONORARIO', nombre: '002' },
    { idClaveTipCon: 'CONFIANZA', nombre: '003' },
    { idClaveTipCon: 'LISTA DE RAYA', nombre: '004' },
  ];

  public pClaveDirec = [
    { idClaveDirec: 'CENTRO DE COMUNICACIONES, COMPUTO, CONTROL Y COMANDO', nombre: '001' },
    { idClaveDirec: 'SEGURIDAD PUBLICA', nombre: '002' },
    { idClaveDirec: 'DIRECCION GENERAL DEL CENTRO DE MANDO Y COMUNICACIONES', nombre: '003' },
    { idClaveDirec: 'SUBDIRECCION OPERATIVA DEL CENTRO DE MANDO Y COMUNICACIONES', nombre: '004' },
    { idClaveDirec: 'DIRECCION TECNICA DEL CENTRO DE MANDO Y COMUNICACIONES', nombre: '005' },
    { idClaveDirec: 'SUBDIRECCION DEL CENTRO ESTATAL DE INFORMACION', nombre: '006' },
  ];

  public pClaveCatego = [
    { idClaveCatego: 'DIRECTOR GENERAL', nombre: '001' },
    { idClaveCatego: 'INTENDENTE', nombre: '003' },
    { idClaveCatego: 'JEFE DE DEPARTAMENTO A', nombre: '004' },
    { idClaveCatego: 'JEFE DE AREA', nombre: '006' },
    { idClaveCatego: 'SUBDIRECTOR', nombre: '007' },
    { idClaveCatego: 'SUPERVISOR', nombre: '008' },
    { idClaveCatego: 'VIGILANTE', nombre: '009' },
    { idClaveCatego: 'VISITAS', nombre: '010' },
    { idClaveCatego: 'POLICIA DEL ESTADO', nombre: '011' },
    { idClaveCatego: 'ANALISTAS', nombre: '012' },
    { idClaveCatego: 'COMISIONADO', nombre: '013' },
    { idClaveCatego: 'OPERADOR CIUDADANO VIGILANTE', nombre: '014' },
    { idClaveCatego: 'EJECUTIVO TELEFONICO CALLE 911', nombre: '015' },
    { idClaveCatego: 'TECNICO', nombre: '016' },
    { idClaveCatego: 'AUXILIAR TECNICO', nombre: '017' },
    { idClaveCatego: 'EJECUTIVO TELEFONICO DAC 089', nombre: '018' },
    { idClaveCatego: 'SECRETARIA DIRECIÓN GENERAL', nombre: '019' },
    { idClaveCatego: 'PARTICULAR DE DIRECCIÓN GENERAL', nombre: '020' },
    { idClaveCatego: 'JEFE DE DEPARTAMENTO', nombre: '021' },
    { idClaveCatego: 'AUXILIAR ADMINISTRATIVO', nombre: '022' },
    { idClaveCatego: 'MONITORISTA DE CALIDAD', nombre: '023' },
    { idClaveCatego: 'AUXILIAR DE CIBERNETICA', nombre: '024' },
    { idClaveCatego: 'SECRETARIA DE LA DIRECCION DEL CEI', nombre: '025' },
  ];

  public pClaveDepto = [
    { idClaveDepto: 'DIRECTOR GENERAL', nombre: '001' },
    { idClaveDepto: 'COORDINACION DE SOPORTE TECNICO', nombre: '002' },
    { idClaveDepto: 'COORDINACION TECNICA OPERATIVA', nombre: '003' },
    { idClaveDepto: 'DEPARTAMENTO DE SISTEMAS', nombre: '004' },
    { idClaveDepto: 'CENTRO DE ATENCION DE LLAMADAS DE EMERGENCIA CALLE-911', nombre: '005' },
    { idClaveDepto: 'DEPARTAMENTO DE MANTTO. Y SERVICIOS GENERALES', nombre: '006' },
    { idClaveDepto: 'UNIDAD  ADMINISTRATIVA', nombre: '007' },
    { idClaveDepto: 'DENUNCIA ANONIMA CIUDADANA 089', nombre: '008' },
    { idClaveDepto: 'CENTRO DE ATENCION TELEFONICA', nombre: '009' },
    { idClaveDepto: 'SUBDIRECCION OPERATIVA', nombre: '010' },
    { idClaveDepto: 'POLICIA ESTATAL DE CAMINOS', nombre: '011' },
    { idClaveDepto: 'DIRECCION TECNICA', nombre: '012' },
    { idClaveDepto: 'DEPARTAMENTO DE CALIDAD', nombre: '013' },
    { idClaveDepto: 'DEPARTAMENTO DE VIDEO VIGILANCIA', nombre: '014' },
    { idClaveDepto: 'DEPARTAMENTO DE ANALISIS', nombre: '015' },
    { idClaveDepto: 'CIUDADANO VIGILANTE', nombre: '016' },
    { idClaveDepto: 'DEPARTAMENTO DE TELECOMUNICACIONES', nombre: '017' },
    { idClaveDepto: 'DEPARTAMENTO DE CIBERNETICA', nombre: '018' },
    { idClaveDepto: 'DIRECCION DEL CENTRO ESTATAL DE INFORMACION', nombre: '019' },
    { idClaveDepto: 'DEPARTAMENTO DE RADIO COMUNICACIONES', nombre: '020' },
    { idClaveDepto: 'SOPORTE TECNICO CIUDADANO VIGILANTE', nombre: '021' },
    { idClaveDepto: 'SEGURIDAD DE REDES Y SEGURIDAD PERIMETRAL', nombre: '022' },
  ];

  public pClaveHorario = [
    { idClaveHorario: 'MIXTO', nombre: '001' },
    { idClaveHorario: 'HORARIO VARIABLE', nombre: '002' },
    { idClaveHorario: 'HORARIO ESPECIAL', nombre: '003' },
    { idClaveHorario: 'HORARIO 066', nombre: '004' },
    { idClaveHorario: 'UNO', nombre: '005' },
  ];

  public pEstatus = [
    { idEstatus: 'ACTIVO', nombre: true },
    { idEstatus: 'BAJA', nombre: false },

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
    private _personalService: PersonalService,
    private _puestosService: PuestosService,
    private _corporacionesService: CorporacionesService,
    private _recursosPagosService: RecursosPagosService,
    private _gradosAcademicosService: GradosAcademicosService,
    private _carrerasService: CarrerasService
  ) { 
    this.idPersonal = this.dialogConfig.data.idPersonal;
  }

  ngOnInit(): void {
    this.buildFormPersonal();
    this.getPersonal();
    this.getAllPuestos();
    this.getAllCorporaciones();
    this.getAllRecursosPagos();
    this.getAllGradosAcademicos();
    this.getAllCarreras();

  }

  async getPersonal()
  {
    if (this.idPersonal != undefined)
    {
      await this._personalService.getPersonal(this.idPersonal).toPromise()
      .then(
        response => {
          console.log("1.- ", response);

          this.personal = response.data;

          //Cargamos los datos al formulario
           this.cargarDataAlFormulario();
        }
      )
      .catch(
        error => {
          console.log("Error getPersonal -> ", error);
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

  buildFormPersonal()
  {
    this.personalForm = this._formBuilder.group({
      clave_P: ['', Validators.required],
      rfc_P: ['', Validators.required],
      nombre_P: ['', Validators.required],
      domicilio_P: ['', Validators.required],
      edad_P: ['', Validators.required],
      sexo_P: ['', Validators.required],
      ecivil_P: ['', Validators.required],
      tel_P: ['', Validators.required],
      telcel_P: ['', Validators.required],
      gruposan_P: ['', Validators.required],
      estudio_P: ['', Validators.required],
      titulo: ['', Validators.required],
      postgrado: '',
      fotografia: '',
      clave_Catego: '',
      clave_Status: '',
      puesto_P: '',
      clave_TipContrato: ['', Validators.required],
      compensacion_P:'',
      sueldoneto_P: ['', Validators.required],
      fecha_alta_P: ['', Validators.required],
      clave_Direc: '',
      clave_Depto: ['', Validators.required],
      clave_Horario: ['', Validators.required],
      funciones: '',
      fecha_baja_P: '',
      id_Acceso: '',
      clave_Puesto:'' ,
      clave_p_Int: '',
      estatus: ''
    });
  }

  cargarDataAlFormulario()
  {
    this.personalForm.patchValue({
      clave_P: this.personal.clave_P,
      rfc_P:   this.personal.rfc_P,
      nombre_P: this.personal.nombre_P,
      domicilio_P: this.personal.domicilio_P,
      edad_P: this.personal.edad_p,
      sexo_P: this.personal.sexo_P,
      ecivil_P: this.personal.ecivil_P,
      tel_P: this.personal.tel_P,
      telcel_P: this.personal.telcel_P,
      gruposan_P: this.personal.gruposan_P,
      estudio_P: this.personal.estudio_P,
      titulo: this.personal.titulo,
      postgrado: this.personal.postgrado,
      fotografia: this.personal.fotografia,
      clave_Catego: this.personal.clave_Catego,
      clave_Status: this.personal.clave_Status,
      puesto_P: this.personal.puesto_P,
      clave_TipContrato: this.personal.clave_TipContrato,
      compensacion_P : this.personal.compensacion_P,
      sueldoneto_P: this.personal.sueldoneto_P,
      fecha_alta_P: new Date(this.personal.fecha_alta_P),
      clave_Direc: this.personal.clave_Direc,
      clave_Depto: this.personal.clave_Depto,
      clave_Horario: this.personal.clave_Horario,
      funciones: this.personal.funciones,
      fecha_baja_P: new Date(this.personal.fecha_baja_P),
      // id_Acceso: this.personal.id_Acceso,
      // clave_Puesto: this.personal.clave_Puesto,
      // clave_p_Int: this.personal.clave_p_Int,
      estatus: this.personal.estatus
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }

  
  savePersonal()
  {
    if (this.personalForm.invalid)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});

      return Object.values( this.personalForm.controls ).forEach( control => {
        
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
    this.personal.clave_P = this.personalForm.get('clave_P')?.value;
    this.personal.rfc_P   = this.personalForm.get('rfc_P')?.value;
    this.personal.nombre_P = this.personalForm.get('nombre_P')?.value;
    this.personal.domicilio_P = this.personalForm.get('domicilio_P')?.value;
    this.personal.edad_p = this.personalForm.get('edad_P')?.value;
    this.personal.sexo_P = this.personalForm.get('sexo_P')?.value;
    this.personal.ecivil_P = this.personalForm.get('ecivil_P')?.value;
    this.personal.tel_P = this.personalForm.get('tel_P')?.value;
    this.personal.telcel_P = this.personalForm.get('telcel_P')?.value;
    this.personal.gruposan_P = this.personalForm.get('gruposan_P')?.value;
    this.personal.estudio_P = this.personalForm.get('estudio_P')?.value;
    this.personal.titulo = this.personalForm.get('titulo')?.value;
    this.personal.postgrado = this.personalForm.get('postgrado')?.value;
    this.personal.fotografia = this.personalForm.get('fotografia')?.value;
    this.personal.clave_Catego = this.personalForm.get('clave_Catego')?.value;
    this.personal.clave_Status = this.personalForm.get('clave_Status')?.value;
    this.personal.puesto_P = this.personalForm.get('puesto_P')?.value;
    this.personal.clave_TipContrato = this.personalForm.get('clave_TipContrato')?.value;
    this.personal.compensacion_P = this.personalForm.get('compensacion_P')?.value;
    this.personal.sueldoneto_P = this.personalForm.get('sueldoneto_P')?.value;
    this.personal.fecha_alta_P = this.personalForm.get('fecha_alta_P')?.value;
    this.personal.clave_Direc = this.personalForm.get('clave_Direc')?.value;
    this.personal.clave_Depto = this.personalForm.get('clave_Depto')?.value;
    this.personal.clave_Horario = this.personalForm.get('clave_Horario')?.value;
    this.personal.funciones = this.personalForm.get('funciones')?.value;
    this.personal.fecha_baja_P = this.personalForm.get('fecha_baja_P')?.value;
    // this.personal.id_Acceso = this.personalForm.get('id_Acceso')?.value;
    // this.personal.clave_Puesto = this.personalForm.get('clave_Puesto')?.value;
    // this.personal.clave_p_Int = this.personalForm.get('clave_p_Int')?.value;
    this.personal.estatus = this.personalForm.get('estatus')?.value;

    console.log( this.personal);

    if (this.idPersonal == undefined)
    {
      this._personalService.createPersonal(this.personal).subscribe(
        response => {
          console.log(response);

          //Cerramos el modal del formulario con valor 'CREATE-OK' para recargar la tabla principal
          this.dialogRef.close('CREATE-OK');
        },
        error => {
          console.log(error);
          if (error.status == 400)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al crear',
              text: error.error.msg,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#922240'
            });
          }
        }
      );
    }
    else
    {
      this._personalService.updatePersonal(this.personal).subscribe(
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
   get claveP_NoValido() {
    return this.personalForm.get('clave_P')?.invalid && this.personalForm.get('clave_P')?.touched;
  }
   get rfcP_NoValido() {
    return this.personalForm.get('rfc_P')?.invalid && this.personalForm.get('rfc_P')?.touched;
  }
   get nombreP_NoValido() {
    return this.personalForm.get('nombre_P')?.invalid && this.personalForm.get('nombre_P')?.touched;
  }
   get domicilioP_NoValido() {
    return this.personalForm.get('domicilio_P')?.invalid && this.personalForm.get('domicilio_P')?.touched;
  }
   get edadP_NoValido() {
    return this.personalForm.get('edad_P')?.invalid && this.personalForm.get('edad_P')?.touched;
  }
   get sexoP_NoValido() {
    return this.personalForm.get('sexo_P')?.invalid && this.personalForm.get('sexo_P')?.touched;
  }
   get ecivilP_NoValido() {
    return this.personalForm.get('ecivil_P')?.invalid && this.personalForm.get('ecivil_P')?.touched;
  }
   get telP_NoValido() {
    return this.personalForm.get('tel_P')?.invalid && this.personalForm.get('tel_P')?.touched;
  }
   get telcelP_NoValido() {
    return this.personalForm.get('telcel_P')?.invalid && this.personalForm.get('telcel_P')?.touched;
  }
   get gruposanP_NoValido() {
    return this.personalForm.get('gruposan_P')?.invalid && this.personalForm.get('gruposan_P')?.touched;
  }
   get estudioP_NoValido() {
    return this.personalForm.get('estudio_P')?.invalid && this.personalForm.get('estudio_P')?.touched;
  }
   get titulo_NoValido() {
    return this.personalForm.get('titulo')?.invalid && this.personalForm.get('titulo')?.touched;
  }
   get postgrado_NoValido() {
    return this.personalForm.get('postgrado')?.invalid && this.personalForm.get('postgrado')?.touched;
  }
   get fotografia_NoValido() {
    return this.personalForm.get('fotografia')?.invalid && this.personalForm.get('fotografia')?.touched;
  }
   get claveCatego_NoValido() {
    return this.personalForm.get('clave_Catego')?.invalid && this.personalForm.get('clave_Catego')?.touched;
  }
   get claveStatus_NoValido() {
    return this.personalForm.get('clave_Status')?.invalid && this.personalForm.get('clave_Status')?.touched;
  }
   get puestoP_NoValido() {
    return this.personalForm.get('puesto_P')?.invalid && this.personalForm.get('puesto_P')?.touched;
  }
   get claveTipContrato_NoValido() {
    return this.personalForm.get('clave_TipContrato')?.invalid && this.personalForm.get('clave_TipContrato')?.touched;
  }
  get compensacionP_NoValido() {
    return this.personalForm.get('compensacion_P')?.invalid && this.personalForm.get('compensacion_P')?.touched;
  }
   get sueldonetoP_NoValido() {
    return this.personalForm.get('sueldoneto_P')?.invalid && this.personalForm.get('sueldoneto_P')?.touched;
  }
   get claveDirec_NoValido() {
    return this.personalForm.get('clave_Direc')?.invalid && this.personalForm.get('clave_Direc')?.touched;
  }
   get claveDepto_NoValido() {
    return this.personalForm.get('clave_Depto')?.invalid && this.personalForm.get('clave_Depto')?.touched;
  }
   get claveHorario_NoValido() {
    return this.personalForm.get('clave_Horario')?.invalid && this.personalForm.get('clave_Horario')?.touched;
  }
  get funciones_NoValido() {
    return this.personalForm.get('funciones')?.invalid && this.personalForm.get('funciones')?.touched;
  }
  // get idAcceso_NoValido() {
  //   return this.personalForm.get('id_Acceso')?.invalid && this.personalForm.get('id_Acceso')?.touched;
  // }
  // get clavePuesto_NoValido() {
  //   return this.personalForm.get('clave_Puesto')?.invalid && this.personalForm.get('clave_Puesto')?.touched;
  // }
  // get clavePInt_NoValido() {
  //   return this.personalForm.get('clave_p_Int')?.invalid && this.personalForm.get('clave_p_Int')?.touched;
  // }
  get estatus_NoValido() {
    return this.personalForm.get('estatus')?.invalid && this.personalForm.get('estatus')?.touched;
  }

}
