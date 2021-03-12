import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Student } from 'src/app/core/models/student';
import { StudentService } from 'src/app/core/services/student.service';
import { ProfileEditComponent } from '../../student/profile-edit/profile-edit.component';

@Component({
  selector: 'nav-logged',
  templateUrl: './nav-logged.component.html',
  styleUrls: ['./nav-logged.component.scss']
})
export class NavLoggedComponent implements OnInit {

  loaded = false;
  student!: Student;
  isAdmin = false;
  isInstructor = false;

  constructor(private router: Router,
              private authService: AuthService,
              private studentService: StudentService,
              private profileEditDialog: MatDialog) {
               }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    this.studentService.getLoggedStudent()
      .subscribe(student => {
        this.student = student;
        this.isAdmin = JSON.stringify(student.roles).includes("ADMIN");
        this.isInstructor = JSON.stringify(student.roles).includes("INSTRUCTOR");
        this.loaded = true;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openEditProfileDialog(student: Student): void{
    const dialogRef = this.profileEditDialog.open(ProfileEditComponent, {
      minWidth: '310px', 
      maxWidth: '800px',
      data: {
        id: student.id,
        username: student.username,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        birthDate: student.birthDate, 
        gender: student.gender,
        portfolioURL: student.portfolioURL
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.getStudent();
      }
    )
  }
}
