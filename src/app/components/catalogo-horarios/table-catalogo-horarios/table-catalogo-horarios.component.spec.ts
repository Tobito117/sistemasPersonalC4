import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCatalogoHorariosComponent } from './table-catalogo-horarios.component';

describe('TableCatalogoHorariosComponent', () => {
  let component: TableCatalogoHorariosComponent;
  let fixture: ComponentFixture<TableCatalogoHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCatalogoHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCatalogoHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
