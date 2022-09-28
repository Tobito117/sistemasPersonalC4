import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHorarioEmpleadoComponent } from './form-horario-empleado.component';

describe('FormHorarioEmpleadoComponent', () => {
  let component: FormHorarioEmpleadoComponent;
  let fixture: ComponentFixture<FormHorarioEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHorarioEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHorarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
