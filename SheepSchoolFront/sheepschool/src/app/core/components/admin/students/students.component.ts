import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Student } from './../../../models/student';
import { merge, of as observableOf } from 'rxjs';
import { StudentService } from './../../../services/student.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AdminProfileStudentEditComponent } from './admin-profile-student-edit/admin-profile-student-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit {

  students: Student[] = [];
  displayedColumns: string[] = ['id', 'username', 'firstName','registeredAt', 'lastLogin', 'userStatus', 'score'];

  resultsLength = 24;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private studentService: StudentService,
              private profileEditDialog: MatDialog)
              { }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.studentService.getAllStudents(
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
      ).subscribe(data => this.students = data);
  }

  editStudent(student: Student){
    console.log(student.username);
    console.log(student.birthDate);
  }

  
  openEditProfileDialog(student: Student): void{
    const dialogRef = this.profileEditDialog.open(AdminProfileStudentEditComponent, {
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
       // this.getStudent();
      }
    )
  }

}
