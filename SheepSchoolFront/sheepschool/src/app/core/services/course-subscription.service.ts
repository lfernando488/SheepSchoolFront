import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/utils/pageable';
import { environment } from 'src/environments/environment';
import { CourseSubscription } from '../models/course-subscription';

@Injectable({
  providedIn: 'root'
})
export class CourseSubscriptionService {

  private readonly courseSubscriptionUrl = `${environment.apiUrl}/course-subscriptions`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient) { }

  getCourseSubscriptions(page: number, size: number, direction: string, orderBy: string): Observable<Pageable<CourseSubscription>> {
    const requestUrl = `${this.courseSubscriptionUrl}?page=${page}&size=${size}&direction=${direction.toUpperCase()}&orderBy=${orderBy}`;
    return this.httpClient.get<Pageable<CourseSubscription>>(requestUrl);
  }
}
