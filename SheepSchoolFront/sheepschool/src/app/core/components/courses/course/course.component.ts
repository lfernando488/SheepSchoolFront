import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Course } from 'src/app/core/models/course';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course?: Course;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private courseService: CourseService) {
              }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const coursePermalink = this.route.snapshot.url.pop()!.path;
    this.courseService.getCourseByPermalink(coursePermalink)
      .subscribe(course => this.course = course);
  }

  goBack(): void {
    this.location.back();
  }

}
