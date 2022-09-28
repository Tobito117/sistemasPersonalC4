import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDepartamentoComponent } from './form-departamento.component';

describe('FormDepartamentoComponent', () => {
  let component: FormDepartamentoComponent;
  let fixture: ComponentFixture<FormDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
