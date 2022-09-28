import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { DepartamentosService } from '../../../services/departamentos.service';
import { DepartamentoModel } from '../../../models/departamento.model';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.scss']
})
export class FormDepartamentoComponent implements OnInit {

  public departamentoForm!: FormGroup;

  public idDepartamento: number;

  public departamento = new DepartamentoModel();

  constructor(
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef, 
    public dialogConfig: DynamicDialogConfig,
    private _departamentoService: DepartamentosService
  ) {
    this.buildFormDepartamento();
    this.idDepartamento = this.dialogConfig.data.idDepartamento;
  }

  ngOnInit(): void {
    this.getDepartamento();
  }

  getDepartamento()
  {
    if (this.idDepartamento != undefined)
    {
      this._departamentoService.getDepartamento(this.idDepartamento).subscribe(
        response => {
          console.log(response);
          this.departamento = response.data;

          //Cargamos los datos al formulario
          this.cargarDataAlFormulario();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  buildFormDepartamento()
  {
    this.departamentoForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      extension: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  cargarDataAlFormulario()
  {
    this.departamentoForm.patchValue({
      nombre: this.departamento.nombre,
      clave: this.departamento.claveDepartamento,
      extension: this.departamento.extensionTelefono,
      descripcion: this.departamento.descripcion
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }

  saveDepartamento()
  {
    if (this.departamentoForm.invalid)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});
      
      return Object.values( this.departamentoForm.controls ).forEach( control => {
        
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
    this.departamento.nombre = this.departamentoForm.get('nombre')?.value;
    this.departamento.claveDepartamento = this.departamentoForm.get('clave')?.value;
    this.departamento.extensionTelefono = this.departamentoForm.get('extension')?.value;
    this.departamento.descripcion = this.departamentoForm.get('descripcion')?.value;

    if (this.idDepartamento == undefined)
    {
      this._departamentoService.createDepartamento(this.departamento).subscribe(
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
      this._departamentoService.updateDepartamento(this.departamento).subscribe(
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
    return this.departamentoForm.get('nombre')?.invalid && this.departamentoForm.get('nombre')?.touched;
  }

  get claveNoValido() {
    return this.departamentoForm.get('clave')?.invalid && this.departamentoForm.get('clave')?.touched;
  }

  get extensionNoValido() {
    return this.departamentoForm.get('extension')?.invalid && this.departamentoForm.get('extension')?.touched;
  }

  get descripcionNoValido() {
    return this.departamentoForm.get('descripcion')?.invalid && this.departamentoForm.get('descripcion')?.touched;
  }

}
