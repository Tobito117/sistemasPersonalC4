import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCorporacionComponent } from './form-corporacion.component';

describe('FormCorporacionComponent', () => {
  let component: FormCorporacionComponent;
  let fixture: ComponentFixture<FormCorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCorporacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
