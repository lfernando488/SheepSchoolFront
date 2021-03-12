import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileStudentEditComponent } from './admin-profile-student-edit.component';

describe('AdminProfileStudentEditComponent', () => {
  let component: AdminProfileStudentEditComponent;
  let fixture: ComponentFixture<AdminProfileStudentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileStudentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
