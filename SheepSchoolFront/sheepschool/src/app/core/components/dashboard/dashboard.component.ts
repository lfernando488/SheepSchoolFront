import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loaded = false;
  isInstructor = false;
  student!: Student;
  
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.studentService.getLoggedStudent()
      .subscribe(student => {
        this.student = student;
        this.isInstructor = JSON.stringify(student.roles).includes("INSTRUCTOR");
        this.loaded = true;
    });
  }
}
