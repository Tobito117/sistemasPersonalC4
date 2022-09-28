import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCorporacionesComponent } from './table-corporaciones.component';

describe('TableCorporacionesComponent', () => {
  let component: TableCorporacionesComponent;
  let fixture: ComponentFixture<TableCorporacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCorporacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCorporacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
