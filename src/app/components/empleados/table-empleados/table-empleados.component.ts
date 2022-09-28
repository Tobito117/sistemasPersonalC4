import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { EmpleadosService } from '../../../services/empleados.service';
import { EmpleadoModel } from '../../../models/empleado.model';
import { DetalleEmpleadoComponent } from '../detalle-empleado/detalle-empleado.component';
import { FormEmpleadoComponent } from '../form-empleado/form-empleado.component';

@Component({
  selector: 'app-table-empleados',
  templateUrl: './table-empleados.component.html',
  styleUrls: ['./table-empleados.component.scss']
})
export class TableEmpleadosComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public empleados: EmpleadoModel[] = [];

  public titleModal: string = '';

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.getAllEmpleados();
  }

  getAllEmpleados()
  {
    this._empleadosService.getAllEmpleados().subscribe(
      response => {
        console.log(response);
        this.empleados = response.data;

        //Recorre todos los elementos que vengan de la API
        for (let empleado of this.empleados)
        {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          empleado.deshabilitar = empleado.estatus;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //Filtra los datos de la tabla
  filterGlobalTable(event: any, stringValue: any)
  {
    this.datatable?.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showModalFormEmpleado(pIdEmpleado?: number)
  {    
    if (pIdEmpleado == undefined)
    {
      this.titleModal = 'Agregar empleado';
    }
    else
    {
      this.titleModal = 'Editar empleado';
    }
    
    this.dialogRef = this.dialogService.open(FormEmpleadoComponent, {
      data: {
        idEmpleado: pIdEmpleado
      },
      header: this.titleModal,
      width: '50vw',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });

    //Después de cerrar el modal del formulario
    this.dialogRef.onClose.subscribe((result) =>{
      if (result == 'CREATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos guardados correctamente', life: 3000});
        this.getAllEmpleados();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllEmpleados();
      }
    });
  }

  showModalDetalleEmpleado(pIdEmpleado?: number)
  {
    this.dialogRef = this.dialogService.open(DetalleEmpleadoComponent, {
      data: {
        idEmpleado: pIdEmpleado
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  disableEmpleado(event: any, pIdEmpleado: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const empleadoRow = this.empleados.filter(result => result.idEmpleado == pIdEmpleado);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._empleadosService.updateEstatusEmpleado(pIdEmpleado, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Empleados'
              setTimeout(() => {
                this.getAllEmpleados();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          empleadoRow[0].deshabilitar = true;
        }
      });
    }
    else
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de habilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._empleadosService.updateEstatusEmpleado(pIdEmpleado, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Empleados'
              setTimeout(() => {
                this.getAllEmpleados();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          empleadoRow[0].deshabilitar = false;
        }
      });
    }
  }

}
