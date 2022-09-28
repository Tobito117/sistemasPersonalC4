import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosPorEmpleadoComponent } from './horarios-por-empleado.component';

describe('HorariosPorEmpleadoComponent', () => {
  let component: HorariosPorEmpleadoComponent;
  let fixture: ComponentFixture<HorariosPorEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorariosPorEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosPorEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
