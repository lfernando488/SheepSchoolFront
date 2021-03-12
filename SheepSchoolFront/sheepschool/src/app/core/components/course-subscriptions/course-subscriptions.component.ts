import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CourseSubscription } from '../../models/course-subscription';
import { CourseSubscriptionService } from '../../services/course-subscription.service';

@Component({
  selector: 'app-course-subscriptions',
  templateUrl: './course-subscriptions.component.html',
  styleUrls: ['./course-subscriptions.component.scss']
})
export class CourseSubscriptionsComponent implements AfterViewInit {

  displayedColumns: string[] = ['c.title', 'startedAt', 'finishedAt', 'courseSubscriptionStatus', 'courseSubscriptionScore'];
  courseSubscriptions: CourseSubscription[] = [];

  resultsLength = 24;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseSubscriptionService: CourseSubscriptionService) { }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.courseSubscriptionService.getCourseSubscriptions(
            this.paginator.pageIndex, this.resultsLength, this.sort.direction, this.sort.active);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.numberOfElements;

          return data.content;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.courseSubscriptions = data);
  }
}
