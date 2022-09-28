import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPuestoComponent } from './form-puesto.component';

describe('FormPuestoComponent', () => {
  let component: FormPuestoComponent;
  let fixture: ComponentFixture<FormPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
