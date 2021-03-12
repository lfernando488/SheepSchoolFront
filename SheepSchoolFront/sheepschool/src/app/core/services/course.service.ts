import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pageable } from 'src/app/shared/utils/pageable';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { CourseEdit } from '../models/course-edit';
import { CourseNew } from '../models/dto/course-new';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly courseUrl = `${environment.apiUrl}/courses`;
  private readonly adminCourseUrl = `${environment.apiUrl}/admin/courses`;
  private readonly adminCourseEditUrl = `${environment.apiUrl}/admin/courses-edits`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }


  adminGetCoursesPageable(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<Course>> {
    const requestUrl = `${this.adminCourseUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<Course>>(requestUrl);
  }

  adminGetCoursesEditsPageable(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<CourseEdit>> {
    const requestUrl = `${this.adminCourseEditUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<CourseEdit>>(requestUrl);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.courseUrl}-all`)
  }

  getCoursesPageable(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<Course>> {
    const requestUrl = `${this.courseUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<Course>>(requestUrl);
  }

  getCourseByPermalink(permalink: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.courseUrl}/${permalink}`).pipe();
  }

  createCourse(course: CourseNew): Observable<CourseNew> {
    return this.httpClient.post<CourseNew>(this.courseUrl, course, this.httpOptions).pipe(
      tap(_ => {
        this.log(`Curso criado com sucesso, agora você precisa continuar editando.`);
        catchError(this.handleError<CourseNew>('createCourse'));
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(this.courseUrl, course, this.httpOptions).pipe(
      //catchError(this.handleError('updateHero', hero))
    );
  }

  deleteCourse(id: number): Observable<Course> {
    const url = `${this.courseUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete<Course>(url, this.httpOptions)
      .pipe(
        //  catchError(this.handleError('deleteHero'))
      );
  }

  getInstructorCourses(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<Course>> {
    const requestUrl = `${environment.apiUrl}/instructor-courses?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<Course>>(requestUrl);
  }


  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.errorLog(`${operation} falhou: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.openSnackBar(message, "Suave...");
  }

  private errorLog(message: string) {
    console.log(message);
  }
}
