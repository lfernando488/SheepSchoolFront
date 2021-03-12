import { TestBed } from '@angular/core/testing';

import { CourseSubscriptionService } from './course-subscription.service';

describe('CourseSubscriptionService', () => {
  let service: CourseSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
