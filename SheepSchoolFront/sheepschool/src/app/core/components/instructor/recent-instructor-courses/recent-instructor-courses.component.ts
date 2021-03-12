import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'recent-instructor-courses',
  templateUrl: './recent-instructor-courses.component.html',
  styleUrls: ['./recent-instructor-courses.component.scss']
})
export class RecentInstructorCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getInstructorCourses();
  }

  getInstructorCourses(): void {
    this.courseService.getInstructorCourses(0, 4, 'DESC', 'updatedAt')
      .subscribe(c => this.courses = c.content);
  }
}
