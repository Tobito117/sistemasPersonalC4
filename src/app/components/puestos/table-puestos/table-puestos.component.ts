import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PuestosService } from '../../../services/puestos.service';
import { PuestoModel } from '../../../models/puesto.model';
import { FormPuestoComponent } from '../form-puesto/form-puesto.component';
import { DetallePuestoComponent } from '../detalle-puesto/detalle-puesto.component';

@Component({
  selector: 'app-table-puestos',
  templateUrl: './table-puestos.component.html',
  styleUrls: ['./table-puestos.component.scss']
})
export class TablePuestosComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public puestos: PuestoModel[] = [];

  public titleModal: string = '';

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _puestosServices: PuestosService
  ) { }

  ngOnInit(): void {
    this.getAllPuestos();
  }

  getAllPuestos()
  {
    this._puestosServices.getAllPuestos().subscribe(
      response => {
        console.log(response);
        this.puestos = response.data;

        //Recorre todos los elementos que vengan de la API
        for (let puesto of this.puestos)
        {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          puesto.deshabilitar = puesto.estatus;
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

  showModalFormPuesto(pIdPuesto?: number)
  {    
    if (pIdPuesto == undefined)
    {
      this.titleModal = 'Agregar puesto';
    }
    else
    {
      this.titleModal = 'Editar puesto';
    }
    
    this.dialogRef = this.dialogService.open(FormPuestoComponent, {
      data: {
        idPuesto: pIdPuesto
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
        this.getAllPuestos();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllPuestos();
      }
    });
  }

  showModalDetallePuesto(pIdPuesto?: number)
  {
    this.dialogRef = this.dialogService.open(DetallePuestoComponent, {
      data: {
        idPuesto: pIdPuesto
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  disablePuesto(event: any, pIdPuesto: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const puestoRow = this.puestos.filter(result => result.idPuesto == pIdPuesto);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._puestosServices.updateEstatusPuesto(pIdPuesto, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Puestos'
              setTimeout(() => {
                this.getAllPuestos();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          puestoRow[0].deshabilitar = true;
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
          this._puestosServices.updateEstatusPuesto(pIdPuesto, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Puestos'
              setTimeout(() => {
                this.getAllPuestos();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          puestoRow[0].deshabilitar = false;
        }
      });
    }
  }
}
