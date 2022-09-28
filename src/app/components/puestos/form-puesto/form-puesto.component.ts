import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { PuestosService } from '../../../services/puestos.service';
import { DepartamentosService } from '../../../services/departamentos.service';
import { PuestoModel } from '../../../models/puesto.model';

@Component({
  selector: 'app-form-puesto',
  templateUrl: './form-puesto.component.html',
  styleUrls: ['./form-puesto.component.scss']
})
export class FormPuestoComponent implements OnInit {

  public puestoForm!: FormGroup;

  public idPuesto: number;

  public puesto = new PuestoModel();

  public departamentos: any[] = [];

  constructor(
    private messageService: MessageService,

    private _formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef, 
    public dialogConfig: DynamicDialogConfig,
    private _puestosService: PuestosService,
    private _departamentosService: DepartamentosService
  ) {
    this.buildFormCorporacion();
    this.idPuesto = this.dialogConfig.data.idPuesto;
  }

  ngOnInit(): void {
    //1.- Obtiene el Puesto
    this.getPuesto();

    //2.- Obtiene todos los Departamentos
    this.getAllDepartamentos(); 
  }

  async getPuesto()
  {
    if (this.idPuesto != undefined)
    {
      await this._puestosService.getPuesto(this.idPuesto).toPromise()
      .then(
        response => {
          console.log(response);
          this.puesto = response.data;

          //Cargamos los datos al formulario
          this.cargarDataAlFormulario();
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
    }
  }

  async getAllDepartamentos()
  {
    await this._departamentosService.getAllDepartamentos().toPromise()
    .then(
      response => {
        console.log(response);
        this.departamentos = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  buildFormCorporacion()
  {
    this.puestoForm = this._formBuilder.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fk_idDepartamento: ['', Validators.required]
    });
  }

  cargarDataAlFormulario()
  {
    this.puestoForm.patchValue({
      clave: this.puesto.clave,
      nombre: this.puesto.nombre,
      descripcion: this.puesto.descripcion,
      fk_idDepartamento: this.puesto.fk_idDepartamento
    });
  }

  closeModal()
  {
    this.dialogRef.close();
  }

  saveCorporacion()
  {
    if (this.puestoForm.invalid)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Complete los campos requeridos', life: 3000});

      return Object.values( this.puestoForm.controls ).forEach( control => {
        
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
    this.puesto.clave = this.puestoForm.get('clave')?.value;
    this.puesto.nombre = this.puestoForm.get('nombre')?.value;
    this.puesto.descripcion = this.puestoForm.get('descripcion')?.value;
    this.puesto.fk_idDepartamento = this.puestoForm.get('fk_idDepartamento')?.value;

    if (this.idPuesto == undefined)
    {
      this._puestosService.createPuesto(this.puesto).subscribe(
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
      this._puestosService.updatePuesto(this.puesto).subscribe(
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
  get claveNoValida() {
    return this.puestoForm.get('clave')?.invalid && this.puestoForm.get('clave')?.touched;
  }

  get nombreNoValido() {
    return this.puestoForm.get('nombre')?.invalid && this.puestoForm.get('nombre')?.touched;
  }

  get descripcionNoValida() {
    return this.puestoForm.get('descripcion')?.invalid && this.puestoForm.get('descripcion')?.touched;
  }

  get departamentoNoValido() {
    return this.puestoForm.get('fk_idDepartamento')?.invalid && this.puestoForm.get('fk_idDepartamento')?.touched;
  }

}
