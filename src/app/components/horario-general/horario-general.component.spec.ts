import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioGeneralComponent } from './horario-general.component';

describe('HorarioGeneralComponent', () => {
  let component: HorarioGeneralComponent;
  let fixture: ComponentFixture<HorarioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
