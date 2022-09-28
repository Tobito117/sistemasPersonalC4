import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { CorporacionesService } from '../../../services/corporaciones.service';
import { CorporacionModel } from '../../../models/corporacion.model';

@Component({
  selector: 'app-form-corporacion',
  templateUrl: './form-corporacion.component.html',
  styleUrls: ['./form-corporacion.component.scss']
})
export class FormCorporacionComponent implements OnInit {

  public corporacionForm!: FormGroup;

  public idCorporacion: number;

  public corporacion = new CorporacionModel();

  constructor(
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef, 
    public dialogConfig: DynamicDialogConfig,
    private _corporacionesService: CorporacionesService
  ) { 
    this.buildFormCorporacion();
    this.idCorporacion = this.dialogConfig.data.idCorporacion;
  }

  ngOnInit(): void {
    this.getCorporacion();
  }

  getCorporacion()
  {
    if (this.idCorporacion != undefined)
    {
      this._corporacionesService.getCorporacion(this.idCorporacion).subscribe(
        response => {
          console.log(response);
          this.corporacion = response.data;

          //Cargamos los datos al formulario
          this.cargarDataAlFormulario();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  buildFormCorporacion()
  {
    this.corporacionForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      siglas: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  cargarDataAlFormulario()
  {
    this.corporacionForm.patchValue({
      nombre: this.corporacion.nombre,
      siglas: this.corporacion.siglas,
      direccion: this.corporacion.direccion,
      telefono: this.corporacion.telefono
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }

  saveCorporacion()
  {
    if (this.corporacionForm.invalid)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});

      return Object.values( this.corporacionForm.controls ).forEach( control => {
        
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

    // //Datos a enviar a la API
    this.corporacion.nombre = this.corporacionForm.get('nombre')?.value;
    this.corporacion.siglas = this.corporacionForm.get('siglas')?.value;
    this.corporacion.direccion = this.corporacionForm.get('direccion')?.value;
    this.corporacion.telefono = this.corporacionForm.get('telefono')?.value;

    if (this.idCorporacion == undefined)
    {
      this._corporacionesService.createCorporacion(this.corporacion).subscribe(
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
      this._corporacionesService.updateCorporacion(this.corporacion).subscribe(
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
    return this.corporacionForm.get('nombre')?.invalid && this.corporacionForm.get('nombre')?.touched;
  }

  get siglasNoValidas() {
    return this.corporacionForm.get('siglas')?.invalid && this.corporacionForm.get('siglas')?.touched;
  }

  get direccionNoValida() {
    return this.corporacionForm.get('direccion')?.invalid && this.corporacionForm.get('direccion')?.touched;
  }

  get telefonoNoValido() {
    return this.corporacionForm.get('telefono')?.invalid && this.corporacionForm.get('telefono')?.touched;
  }

}
