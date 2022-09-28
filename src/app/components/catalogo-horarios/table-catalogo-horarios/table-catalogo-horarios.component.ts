import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { CatalogoHorariosService } from '../../../services/catalogo-horarios.service';
import { CatalogoHorarioModel } from '../../../models/catalogo-horario.model';
import { FormHorarioComponent } from '../form-horario/form-horario.component';
import { DetalleHorarioComponent } from '../detalle-horario/detalle-horario.component';

@Component({
  selector: 'app-table-catalogo-horarios',
  templateUrl: './table-catalogo-horarios.component.html',
  styleUrls: ['./table-catalogo-horarios.component.scss']
})
export class TableCatalogoHorariosComponent implements OnInit {

  @ViewChild('dt') datatable: Table | undefined;

  public catalogoHorarios: CatalogoHorarioModel[] = [];

  public titleModal: string = '';

  public dialogRef: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _catalogoHorariosService: CatalogoHorariosService
  ) { }

  ngOnInit(): void {
    this.getAllCatalogoHorarios();
  }

  getAllCatalogoHorarios()
  {
    this._catalogoHorariosService.getAllCatalogoHorarios().subscribe(
      response => {
        console.log(response);
        this.catalogoHorarios = response.data;

        //Recorre todos los elementos que vengan de la API
        for (let horario of this.catalogoHorarios)
        {
          //Le asigna a la propiedad 'deshabilitar' el valor que tenga 'estatus' (Para controlar el inputSwitch)
          horario.deshabilitar = horario.estatus;
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

  showModalFormHorario(pIdCatalogoHorario?: number)
  {    
    if (pIdCatalogoHorario == undefined)
    {
      this.titleModal = 'Agregar horario';
    }
    else
    {
      this.titleModal = 'Editar horario';
    }
    
    this.dialogRef = this.dialogService.open(FormHorarioComponent, {
      data: {
        idCatalogoHorario: pIdCatalogoHorario
      },
      header: this.titleModal,
      width: '50vw',
      contentStyle: {"max-height": "700px", "overflow": "auto"},
      baseZIndex: 10000
    });

    //Después de cerrar el modal del formulario
    this.dialogRef.onClose.subscribe((result) =>{
      if (result == 'CREATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos guardados correctamente', life: 3000});
        this.getAllCatalogoHorarios();
      }
      else if (result == 'UPDATE-OK')
      {
        this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Datos actualizados correctamente', life: 3000});
        this.getAllCatalogoHorarios();
      }
    });
  }

  showModalDetalleHorario(pIdCatalogoHorario?: number)
  {
    this.dialogRef = this.dialogService.open(DetalleHorarioComponent, {
      data: {
        idCatalogoHorario: pIdCatalogoHorario
      },
      header: 'Detalles',
      width: '50vw',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

  disableHorario(event: any, pIdCatalogoHorario: number, pEstatus: boolean) 
  {
    let isChecked = event.checked;

    const horarioRow = this.catalogoHorarios.filter(result => result.idCatalogoHorario == pIdCatalogoHorario);

    if (isChecked == false)
    {
      this.confirmationService.confirm({
        message: '¿Está seguro de deshabilitar este registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this._catalogoHorariosService.updateEstatusHorario(pIdCatalogoHorario, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro deshabilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'CatalogoHorarios'
              setTimeout(() => {
                this.getAllCatalogoHorarios();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          horarioRow[0].deshabilitar = true;
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
          this._catalogoHorariosService.updateEstatusHorario(pIdCatalogoHorario, pEstatus).subscribe(
            response => {
              console.log(response);
              this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registro habilitado correctamente', life: 3000});

              //Retrasa 0.1 segundos el tiempo de llamado a la API de obtener todos los registros de 'CatalogoHorarios'
              setTimeout(() => {
                this.getAllCatalogoHorarios();
              }, 100);
            },
            error => {
              console.log(error);
            }
          );
        },
        reject: () => {
          horarioRow[0].deshabilitar = false;
        }
      });
    }
  }

}
