import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreasEditComponent } from './admin-areas-edit.component';

describe('AdminAreasEditComponent', () => {
  let component: AdminAreasEditComponent;
  let fixture: ComponentFixture<AdminAreasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAreasEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
