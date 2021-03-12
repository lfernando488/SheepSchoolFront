import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesTableComponent } from './admin-courses-table.component';

describe('AdminCoursesTableComponent', () => {
  let component: AdminCoursesTableComponent;
  let fixture: ComponentFixture<AdminCoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoursesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
