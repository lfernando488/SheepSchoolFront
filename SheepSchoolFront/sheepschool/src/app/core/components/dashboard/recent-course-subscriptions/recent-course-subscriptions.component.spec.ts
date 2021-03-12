import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCourseSubscriptionsComponent } from './recent-course-subscriptions.component';

describe('RecentCourseSubscriptionsComponent', () => {
  let component: RecentCourseSubscriptionsComponent;
  let fixture: ComponentFixture<RecentCourseSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentCourseSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCourseSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
