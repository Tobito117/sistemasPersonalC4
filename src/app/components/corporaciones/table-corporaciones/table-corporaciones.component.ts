import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { CorporacionesService } from '../../../services/corporaciones.service';
import { CorporacionModel } from '../../../models/corporacion.model';
import { FormCorporacionComponent } from '../form-corporacion/form-corporacion.component';
import { DetalleCorporacionComponent } from '../detalle-corporacion/detalle-corporacion.component';

@Component({
  selector: 'app-table-corporaciones',
  templateUrl: './table-corporaciones.component.html',
  styleUrls: ['./table-corporaciones.component.scss']
})
export class TableCorporacionesComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public corporaciones: CorporacionModel[] = [];

  public titleModal: string = '';

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _corporacionesService: CorporacionesService
  ) { }

  ngOnInit(): void {
    this.getAllCorporaciones();
  }

  getAllCorporaciones()
  {
    this._corporacionesService.getAllCorporaciones().subscribe(
      response => {
        console.log(response);
        this.corporaciones = response.data;

        //Recorre todos los elementos que vengan de la API
        for (let corporacion of this.corporaciones)
        {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          corporacion.deshabilitar = corporacion.estatus;
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

  showModalFormDepartamento(pIdCorporacion?: number)
  {    
    if (pIdCorporacion == undefined)
    {
      this.titleModal = 'Agregar corporacion';
    }
    else
    {
      this.titleModal = 'Editar corporacion';
    }
    
    this.dialogRef = this.dialogService.open(FormCorporacionComponent, {
      data: {
        idCorporacion: pIdCorporacion
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
        this.getAllCorporaciones();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllCorporaciones();
      }
    });
  }

  showModalDetalleCorporacion(pIdCorporacion?: number)
  {
    this.dialogRef = this.dialogService.open(DetalleCorporacionComponent, {
      data: {
        idCorporacion: pIdCorporacion
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  disableDepartamento(event: any, pIdCorporacion: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const corporacionRow = this.corporaciones.filter(result => result.idCorporacion == pIdCorporacion);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._corporacionesService.updateEstatusCorporacion(pIdCorporacion, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Corporaciones'
              setTimeout(() => {
                this.getAllCorporaciones();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          corporacionRow[0].deshabilitar = true;
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
          this._corporacionesService.updateEstatusCorporacion(pIdCorporacion, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Corporaciones'
              setTimeout(() => {
                this.getAllCorporaciones();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          corporacionRow[0].deshabilitar = false;
        }
      });
    }
  }

}
