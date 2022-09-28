import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

import { DepartamentosService } from '../../../services/departamentos.service';
import { FormDepartamentoComponent } from '../form-departamento/form-departamento.component';
import { DetalleDepartamentoComponent } from '../detalle-departamento/detalle-departamento.component';
import { DepartamentoModel } from '../../../models/departamento.model';

@Component({
  selector: 'app-table-departamentos',
  templateUrl: './table-departamentos.component.html',
  styleUrls: ['./table-departamentos.component.scss']
})
export class TableDepartamentosComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public departamentos: DepartamentoModel[] = [];

  public checked: boolean = true;

  public displayModal: boolean | undefined;
  public titleModal: string = '';

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _departamentosService: DepartamentosService
  ) { }

  ngOnInit(): void {
    this.getAllDepartamentosService();
    this.primengConfig.ripple = true;
  }

  getAllDepartamentosService()
  {
    this._departamentosService.getAllDepartamentos().subscribe(
      response => {
        console.log(response);
        this.departamentos = response.data;
        
        //Recorre todos los elementos que vengan de la API
        for (let departamento of this.departamentos)
        {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          departamento.deshabilitar = departamento.estatus;
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

  showModalDepartamento(pIdDepartamento?: number)
  {    
    if (pIdDepartamento == undefined)
    {
      this.titleModal = 'Agregar departamento';
    }
    else
    {
      this.titleModal = 'Editar departamento';
    }
    
    this.dialogRef = this.dialogService.open(FormDepartamentoComponent, {
      data: {
        idDepartamento: pIdDepartamento
      },
      header: this.titleModal,
      width: '50vw',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    //Después de cerrar el modal del formulario
    this.dialogRef.onClose.subscribe((result) =>{
      if (result == 'CREATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos guardados correctamente', life: 3000});
        this.getAllDepartamentosService();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllDepartamentosService();
      }
    });
  }

  showModalDetalleDepartamento(pIdDepartamento?: number)
  {  
    this.dialogRef = this.dialogService.open(DetalleDepartamentoComponent, {
      data: {
        idDepartamento: pIdDepartamento
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  disableDepartamento(event: any, pIdDepartamento: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const departamentoRow = this.departamentos.filter(result => result.idDepartamento == pIdDepartamento);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._departamentosService.updateEstatusDepartamento(pIdDepartamento, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Departamento'
              setTimeout(() => {
                this.getAllDepartamentosService();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          departamentoRow[0].deshabilitar = true;
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
          this._departamentosService.updateEstatusDepartamento(pIdDepartamento, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Departamento'
              setTimeout(() => {
                this.getAllDepartamentosService();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          departamentoRow[0].deshabilitar = false;
        }
      });
    }
  }

}
