import { AdminCoursesComponent } from './core/components/admin/courses/admin-courses.component';
import { LocalDateTimePipe } from './shared/utils/pipes/local-date-time.pipe';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { CoursesComponent } from './core/components/courses/courses.component';
import { InstructorsComponent } from './core/components/instructors/instructors.component';
import { AuthComponent } from './core/auth/auth.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ErrorInterceptorProvider } from './core/interceptors/error.interceptor';
import { AreasComponent } from './core/components/areas/areas.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { JWTInterceptorProvider } from './core/interceptors/jwt.interceptor';
import { NavLoggedComponent } from './core/components/navbar/nav-logged/nav-logged.component';
import { ProfileEditComponent } from './core/components/student/profile-edit/profile-edit.component';
import { MatSnackBarModule } from  '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './shared/utils/moment-utc-date-adapter';
import { CourseSubscriptionsComponent } from './core/components/course-subscriptions/course-subscriptions.component';
import { CourseComponent } from './core/components/courses/course/course.component';
import { ErrorDialogComponent } from './core/error-handler/error-dialog/error-dialog.component';
import { ErrorHandlerModule } from './core/error-handler/error-handler.module';
import { RecentCourseSubscriptionsComponent } from './core/components/dashboard/recent-course-subscriptions/recent-course-subscriptions.component';
import { AdminComponent } from './core/components/admin/admin.component';
import { RecentInstructorCoursesComponent } from './core/components/instructor/recent-instructor-courses/recent-instructor-courses.component';
import { StudentsComponent } from './core/components/admin/students/students.component';
import { AreaComponent } from './core/components/areas/area/area.component';
import { NewCourseComponent } from './core/components/instructor/new-course/new-course.component';
import { AdminProfileStudentEditComponent } from './core/components/admin/students/admin-profile-student-edit/admin-profile-student-edit.component';
import { AdminCoursesEditComponent } from './core/components/admin/courses/admin-courses-edit/admin-courses-edit.component';
import { AdminAreasEditComponent } from './core/components/admin/areas/admin-areas-edit/admin-areas-edit.component';
import { AdminAreasComponent } from './core/components/admin/areas/admin-areas.component';
import { AdminCoursesTableComponent } from './core/components/admin/courses/admin-courses-table/admin-courses-table.component';
import { AdminCoursesEditsTableComponent } from './core/components/admin/courses/admin-courses-edits-table/admin-courses-edits-table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    InstructorsComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    AreasComponent,
    DashboardComponent,
    NavLoggedComponent,
    ProfileEditComponent,
    CourseSubscriptionsComponent,
    CourseComponent,
    LocalDateTimePipe,
    ErrorDialogComponent,
    RecentCourseSubscriptionsComponent,
    AdminComponent,
    RecentInstructorCoursesComponent,
    StudentsComponent,
    AreaComponent,
    NewCourseComponent,
    AdminCoursesComponent,
    AdminProfileStudentEditComponent,
    AdminCoursesEditComponent,
    AdminAreasEditComponent,
    AdminAreasComponent,
    AdminCoursesTableComponent,
    AdminCoursesEditsTableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MatSnackBarModule,
    ErrorHandlerModule
  ],
  providers: [
    Title,
    ErrorInterceptorProvider,
    JWTInterceptorProvider,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {​​ provide: DateAdapter, useClass: MomentUtcDateAdapter }​​,
    LocalDateTimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
