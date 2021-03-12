import { Component, OnInit } from '@angular/core';
import { CourseSubscription } from 'src/app/core/models/course-subscription';
import { CourseSubscriptionService } from 'src/app/core/services/course-subscription.service';

@Component({
  selector: 'recent-course-subscriptions',
  templateUrl: './recent-course-subscriptions.component.html',
  styleUrls: ['./recent-course-subscriptions.component.scss']
})
export class RecentCourseSubscriptionsComponent implements OnInit {

  courseSubscriptions: CourseSubscription[] = [];

  constructor(private courseSubscriptionService: CourseSubscriptionService) { }

  ngOnInit(): void {
    this.getRecentCourseSubscriptions();
  }

  getRecentCourseSubscriptions(): void {
    this.courseSubscriptionService.getCourseSubscriptions(0, 4, 'DESC', 'startedAt')
      .subscribe(cs => this.courseSubscriptions = cs.content);
  }

}
