import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'admin-courses-table',
  templateUrl: './admin-courses-table.component.html',
  styleUrls: ['./admin-courses-table.component.scss']
})
export class AdminCoursesTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['title', 'subtitle', 'instructors', 'courseLevel', 'courseScore', 'createdAt', 'updatedAt', 'courseStatus'];

  isLoadingResults = true;
  isRateLimitReached = false;

  resultsLength = 24;
  
  courses = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private courseService: CourseService) { }

  ngAfterViewInit(): void {
    this.loadCoursesTable();
  }

  loadCoursesTable(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.courseService.adminGetCoursesPageable(
            this.paginator.pageIndex, this.resultsLength, this.sort.direction, this.sort.active);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.numberOfElements;
          return data.content;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.courses.data = data);
  }

}
