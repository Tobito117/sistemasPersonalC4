import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGuardiaNocturnaComponent } from './table-guardia-nocturna.component';

describe('TableGuardiaNocturnaComponent', () => {
  let component: TableGuardiaNocturnaComponent;
  let fixture: ComponentFixture<TableGuardiaNocturnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGuardiaNocturnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGuardiaNocturnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
