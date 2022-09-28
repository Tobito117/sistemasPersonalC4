import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePuestosComponent } from './table-puestos.component';

describe('TablePuestosComponent', () => {
  let component: TablePuestosComponent;
  let fixture: ComponentFixture<TablePuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
