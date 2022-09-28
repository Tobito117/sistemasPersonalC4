import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCorporacionComponent } from './detalle-corporacion.component';

describe('DetalleCorporacionComponent', () => {
  let component: DetalleCorporacionComponent;
  let fixture: ComponentFixture<DetalleCorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCorporacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
