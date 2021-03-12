import { Component, OnInit } from '@angular/core';
import { Instructor } from '../../models/instructor';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {

  instructors: Instructor[] = [];

  constructor(private instructorService: InstructorService) { }

  ngOnInit(): void {
    this.instructorService.getAllInstructors()
      .subscribe(response => {
                  this.instructors = response
                },
                error => {});
  }
}
