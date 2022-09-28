import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePuestoComponent } from './detalle-puesto.component';

describe('DetallePuestoComponent', () => {
  let component: DetallePuestoComponent;
  let fixture: ComponentFixture<DetallePuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
