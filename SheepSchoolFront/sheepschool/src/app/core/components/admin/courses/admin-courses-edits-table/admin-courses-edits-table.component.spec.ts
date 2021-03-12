import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesEditsTableComponent } from './admin-courses-edits-table.component';

describe('AdminCoursesEditsTableComponent', () => {
  let component: AdminCoursesEditsTableComponent;
  let fixture: ComponentFixture<AdminCoursesEditsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoursesEditsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoursesEditsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
