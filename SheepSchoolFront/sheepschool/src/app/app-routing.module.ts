import { AreasComponent } from './core/components/areas/areas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './core/components/courses/courses.component';
import { HomeComponent } from './core/components/home/home.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth.guard';
import { CourseSubscriptionsComponent } from './core/components/course-subscriptions/course-subscriptions.component';
import { CourseComponent } from './core/components/courses/course/course.component';
import { AdminComponent } from './core/components/admin/admin.component';
import { AreaComponent } from './core/components/areas/area/area.component';
import { NewCourseComponent } from './core/components/instructor/new-course/new-course.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'} },
  { path: 'course-subscriptions', component: CourseSubscriptionsComponent, canActivate: [AuthGuard], data: {title: 'Minhas inscrições'} },
  { path: 'home', component: HomeComponent},
  { path: 'courses', component: CoursesComponent, data: {title: 'Cursos'} },
  { path: 'courses/:permalink', component: CourseComponent },
  { path: 'areas', component: AreasComponent, data: {title: 'Áreas'} },
  { path: 'areas/:permalink', component: AreaComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: 'ADMIN'} },
  { path: 'dashboard/new-course', redirectTo: 'new-course', pathMatch: 'full'},
  { path: 'new-course', component: NewCourseComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN', 'Instructor']}  },
  { path: 'dashboard/:permalink',   redirectTo: '/courses/:permalink', pathMatch: 'full' },
  { path: 'areas/:permalink/:permalink',   redirectTo: '/courses/:permalink', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
