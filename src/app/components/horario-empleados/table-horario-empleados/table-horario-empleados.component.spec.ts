import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHorarioEmpleadosComponent } from './table-horario-empleados.component';

describe('TableHorarioEmpleadosComponent', () => {
  let component: TableHorarioEmpleadosComponent;
  let fixture: ComponentFixture<TableHorarioEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHorarioEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHorarioEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
