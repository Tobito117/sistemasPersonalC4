import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { CatalogoHorariosService } from '../../../services/catalogo-horarios.service';
import { CatalogoHorarioModel } from '../../../models/catalogo-horario.model';

@Component({
  selector: 'app-form-horario',
  templateUrl: './form-horario.component.html',
  styleUrls: ['./form-horario.component.scss']
})
export class FormHorarioComponent implements OnInit {

  public loading: boolean = false;

  public catalogoHorarioForm!: FormGroup;

  public idCatalogoHorario: number;

  public horario = new CatalogoHorarioModel();

  public classCollapse: string = '';

  public tipoHorarios = [
    { idTipoHorario: 1, nombre: 'Policía 12 horas'},
    { idTipoHorario: 2, nombre: 'Prueba 2'},
    { idTipoHorario: 3, nombre: 'Prueba 3'},
  ];

  constructor(
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef, 
    public dialogConfig: DynamicDialogConfig,
    private _catalogoHorariosService: CatalogoHorariosService
  ) {
    this.buildFormHorario();
    this.idCatalogoHorario = this.dialogConfig.data.idCatalogoHorario;
  }

  ngOnInit(): void {
    this.getHorario();
  }

  getHorario()
  {
    if (this.idCatalogoHorario != undefined)
    {
      this._catalogoHorariosService.getHorario(this.idCatalogoHorario).subscribe(
        response => {
          console.log(response);
          this.horario = response.data;

          //Si la hora_entrada 2 y la hora_salida2 vienen vacías
          if (this.horario.hora_entrada2 == '' && this.horario.hora_salida2 == '')
          {
            //Oculta el 'accordion' donde se muestran los inputs para los segundos horarios
            this.classCollapse = '';

            //El switch aparece 'deshabilitado'
            this.catalogoHorarioForm.get('activar_segundo_horario')?.setValue(false);
          }
          else
          {
            //Muestra el 'accordion' donde se muestran los inputs para los segundos horarios
            this.classCollapse = 'show';

            //El switch aparece 'habilitado'
            this.catalogoHorarioForm.get('activar_segundo_horario')?.setValue(true);
          }

          //Cargamos los datos al formulario
          this.cargarDataAlFormulario();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  buildFormHorario()
  {
    this.catalogoHorarioForm = this._formBuilder.group({
      clave: ['', Validators.required],
      descripcion: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      cantidad_retardo: [0, Validators.required],
      activar_segundo_horario: false,
      hora_entrada2: '',
      hora_salida2: '',
      tipo_horario: ['', Validators.required],
      color_horario: ["#FF0000"]
    });
  }

  cargarDataAlFormulario()
  {
    this.catalogoHorarioForm.patchValue({
      clave: this.horario.clave,
      descripcion: this.horario.descripcion,
      color_horario: this.horario.color,

      //Si la hora_entrada viene vacía, se deja tal cual para que no asigne la hora actual, caso contrario, convierte a tipo Fecha el valor que viene de la BD
      hora_entrada: this.horario.hora_entrada == '' ? '' : new Date(this.horario.hora_entrada),

      //Si la hora_salida viene vacía, cse deja tal cual para que no asigne la hora actual, caso contrario, convierte a tipo Fecha el valor que viene de la BD
      hora_salida: this.horario.hora_salida == '' ? '' : new Date(this.horario.hora_salida),

      cantidad_retardo: this.horario.cantidadRetardo,
      
      //Si la hora_entrada2 viene vacía, se deja tal cual para que no asigne la hora actual, caso contrario, convierte a tipo Fecha el valor que viene de la BD
      hora_entrada2:  this.horario.hora_entrada2 == '' ? '' : new Date(this.horario.hora_entrada2),

      //Si la hora_salida2 viene vacía, se deja tal cual para que no asigne la hora actual, caso contrario, convierte a tipo Fecha el valor que viene de la BD
      hora_salida2:  this.horario.hora_salida2 == '' ? '' : new Date(this.horario.hora_salida2),

      tipo_horario: this.horario.fk_idTipoHorario,
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }  

  saveHorario()
  {
    if (this.catalogoHorarioForm.invalid)
    {
      this.messageService.add({key: 'keyModal', severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});

      return Object.values( this.catalogoHorarioForm.controls ).forEach( control => {
        
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

    this.loading = true;

    //Datos a enviar a la API
    this.horario.clave = this.catalogoHorarioForm.get('clave')?.value;
    this.horario.descripcion = this.catalogoHorarioForm.get('descripcion')?.value;
    this.horario.hora_entrada = this.catalogoHorarioForm.get('hora_entrada')?.value.toISOString();
    this.horario.hora_salida = this.catalogoHorarioForm.get('hora_salida')?.value.toISOString();
    this.horario.cantidadRetardo = this.catalogoHorarioForm.get('cantidad_retardo')?.value;
    this.horario.hora_entrada2 = this.catalogoHorarioForm.get('hora_entrada2')?.value;
    this.horario.hora_salida2 = this.catalogoHorarioForm.get('hora_salida2')?.value;
    this.horario.fk_idTipoHorario = this.catalogoHorarioForm.get('tipo_horario')?.value;
    this.horario.fk_idTipoHorario = this.catalogoHorarioForm.get('tipo_horario')?.value;
    this.horario.color = this.catalogoHorarioForm.get('color_horario')?.value;

    //Si el inputSwitch de 'Activar segundo horario' se elige como 'deshabilitado', guarda vacíos los campos de 'hora_entrada2' y 'hora_salida2'
    if (this.catalogoHorarioForm.get('activar_segundo_horario')?.value == false)
    {
      this.horario.hora_entrada2 = '';
      this.horario.hora_salida2 = '';
    }

    if (this.idCatalogoHorario == undefined)
    {
      this._catalogoHorariosService.createHorario(this.horario).subscribe(
        response => {
          console.log(response);
          this.loading = false;

          //Cerramos el modal del formulario con valor 'CREATE-OK' para recargar la tabla principal
          this.dialogRef.close('CREATE-OK');
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    }
    else
    {
      this._catalogoHorariosService.updateHorario(this.horario).subscribe(
        response => {
          console.log(response);
          this.loading = false;

          //Cerramos el modal del formulario con valor 'UPDATE-OK' para recargar la tabla principal
          this.dialogRef.close('UPDATE-OK');
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  //--------------------------------- Validadores para el formulario ------------------------------------------------
  get claveNoValida() {
    return this.catalogoHorarioForm.get('clave')?.invalid && this.catalogoHorarioForm.get('clave')?.touched;
  }

  get descripcionNoValida() {
    return this.catalogoHorarioForm.get('descripcion')?.invalid && this.catalogoHorarioForm.get('descripcion')?.touched;
  }

  get horaEntradaNoValida() {
    return this.catalogoHorarioForm.get('hora_entrada')?.invalid && this.catalogoHorarioForm.get('hora_entrada')?.touched;
  }

  get horaSalidaNoValida() {
    return this.catalogoHorarioForm.get('hora_salida')?.invalid && this.catalogoHorarioForm.get('hora_salida')?.touched;
  }

  get cantidadRetardoNoValida() {
    return this.catalogoHorarioForm.get('cantidad_retardo')?.invalid && this.catalogoHorarioForm.get('cantidad_retardo')?.touched;
  }

  get horaEntrada2NoValida() {
    return this.catalogoHorarioForm.get('hora_entrada2')?.invalid && this.catalogoHorarioForm.get('hora_entrada2')?.touched;
  }

  get horaSalida2NoValida() {
    return this.catalogoHorarioForm.get('hora_salida2')?.invalid && this.catalogoHorarioForm.get('hora_salida2')?.touched;
  }

  get tipoHorarioNoValido() {
    return this.catalogoHorarioForm.get('tipo_horario')?.invalid && this.catalogoHorarioForm.get('tipo_horario')?.touched;
  }
}
