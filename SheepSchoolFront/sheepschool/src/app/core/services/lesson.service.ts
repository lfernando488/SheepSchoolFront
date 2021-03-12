import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly lessonsUrl = `${environment.apiUrl}/lessons`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getLesson(id: number): Observable<Lesson> {
    const url = `${this.lessonsUrl}/${id}`;
    return this.httpClient.get<Lesson>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),s
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addLesso(lesson: Lesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(this.lessonsUrl, lesson, this.httpOptions).pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }

  updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.httpClient.put<Lesson>(this.lessonsUrl, lesson, this.httpOptions).pipe(
      //catchError(this.handleError('updateHero', hero))
    );
  }

  deleteLesson(id: number): Observable<Lesson> {
    const url = `${this.lessonsUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete<Lesson>(url, this.httpOptions)
    .pipe(
    //  catchError(this.handleError('deleteHero'))
    );
  }

}
