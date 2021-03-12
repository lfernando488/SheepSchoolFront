import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentInstructorCoursesComponent } from './recent-instructor-courses.component';

describe('RecentInstructorCoursesComponent', () => {
  let component: RecentInstructorCoursesComponent;
  let fixture: ComponentFixture<RecentInstructorCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentInstructorCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentInstructorCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
