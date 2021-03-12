import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/app/shared/utils/pageable';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private readonly instructorsUrl = `${environment.apiUrl}/instructors`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  getAllInstructors(): Observable<Instructor[]> {
    return this.httpClient.get<Instructor[]>(`${this.instructorsUrl}-all`)
  }

  getAllButUser(): Observable<Instructor[]> {
    return this.httpClient.get<Instructor[]>(`${this.instructorsUrl}-all-others`)
  }

  getInstructors(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<Instructor>> {
    const requestUrl = `${this.instructorsUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<Instructor>>(requestUrl);
  }

  getInstructor(id: number): Observable<Instructor> {
    const url = `${this.instructorsUrl}/${id}`;
    return this.httpClient.get<Instructor>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),s
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getInstructorUser(): Observable<Instructor> {
    return this.httpClient.get<Instructor>(`${environment.apiUrl}/instructor`).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),s
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  } 

  addInstructor(instructor: Instructor): Observable<Instructor> {
    return this.httpClient.post<Instructor>(this.instructorsUrl, instructor, this.httpOptions).pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }

  updateInstructor(instructor: Instructor): Observable<Instructor> {
    return this.httpClient.put<Instructor>(this.instructorsUrl, instructor, this.httpOptions).pipe(
      //catchError(this.handleError('updateHero', hero))
    );
  }

  deleteInstructor(id: number): Observable<Instructor> {
    const url = `${this.instructorsUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete<Instructor>(url, this.httpOptions)
    .pipe(
    //  catchError(this.handleError('deleteHero'))
    );
  }


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