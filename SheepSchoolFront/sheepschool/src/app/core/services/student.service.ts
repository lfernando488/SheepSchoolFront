import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pageable } from 'src/app/shared/utils/pageable';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly studentsUrl = `${environment.apiUrl}/students`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }

  getAllStudents(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<Student>> {
    const requestUrl = `${this.studentsUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<Student>>(requestUrl);
  }

  getLoggedStudent(): Observable<Student> {
    const url = `${environment.apiUrl}/student`;
    return this.httpClient.get<Student>(url).pipe();
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.httpClient.get<Student>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),s
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.httpClient.put<Student>(url, student, this.httpOptions).pipe(
      tap(_ => {
        this.log('Dados atualizados com sucesso.');
      })
      //catchError(this.handleError('updateHero', hero))
    );
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete<Student>(url, this.httpOptions)
      .pipe(
        //  catchError(this.handleError('deleteHero'))
      );
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
