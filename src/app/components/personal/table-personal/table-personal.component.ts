import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PersonalService } from '../../../services/personal.service';
import { PersonalModel } from '../../../models/personal.model';
import { DetallePersonalComponent } from '../detalle-personal/detalle-personal.component';
import { FormPersonalComponent } from '../form-personal/form-personal.component';

@Component({
  selector: 'app-table-personal',
  templateUrl: './table-personal.component.html',
  styleUrls: ['./table-personal.component.scss']
})
export class TablePersonalComponent implements OnInit {
  @ViewChild('dt') datatable: Table | undefined;

  public personales: PersonalModel[] = [];

  public titleModal: any;

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _personalesService: PersonalService
  ) { }

  ngOnInit(): void {
    this.getAllPersonal();
  }

  getAllPersonal() {
    this._personalesService.getAllPersonal().subscribe(
      response => {
        console.log(response);
        this.personales = response.data;
        // let Prueba =console.log(this.personales.length + 2);

        //Recorre todos los elementos que vengan de la API
        for (let personal of this.personales) {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          personal.deshabilitar = personal.estatus;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  

  //Filtra los datos de la tabla
  filterGlobalTable(event: any, stringValue: any) {
    this.datatable?.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showModalFormPersonal(pIdPersonal?: number) {
    if (pIdPersonal == undefined) {
      this.titleModal = 'Agregar Personal,' + ' La siguiente clave de Personal en agregar es: ' + (this.personales.length + 3);
    }
    else {
      this.titleModal = 'Editar Personal';
    }

    this.dialogRef = this.dialogService.open(FormPersonalComponent, {
      data: {
        idPersonal: pIdPersonal
      },
      header: this.titleModal,
      width: '50vw',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

     //Después de cerrar el modal del formulario
     this.dialogRef.onClose.subscribe((result) =>{
      if (result == 'CREATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos guardados correctamente', life: 3000});
        this.getAllPersonal();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllPersonal();
      }
    });
  }

  showModalDetallePersonal(pIdPersonal?: number)
  {
    this.dialogRef = this.dialogService.open(DetallePersonalComponent, {
      data: {
        idPersonal: pIdPersonal
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  //Habilitar y deshabilitar
  disableEmpleado(event: any, pIdPersonal: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const personalRow = this.personales.filter(result => result.idPersonal == pIdPersonal);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._personalesService.updateEstatusPersonal(pIdPersonal, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Empleados'
              setTimeout(() => {
                this.getAllPersonal();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          personalRow[0].deshabilitar = true;
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
          this._personalesService.updateEstatusPersonal(pIdPersonal, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'Empleados'
              setTimeout(() => {
                this.getAllPersonal();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          personalRow[0].deshabilitar = false;
        }
      });
    }
  }
}
