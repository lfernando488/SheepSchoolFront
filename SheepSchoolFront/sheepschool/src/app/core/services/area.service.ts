import { Area } from './../models/area';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private readonly areasUrl = `${environment.apiUrl}/areas`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(this.areasUrl)
  }

  addArea(area: Area): Observable<Area> {
    return this.httpClient.post<Area>(this.areasUrl, area, this.httpOptions).pipe(
      //catchError(this.handleError('addHero', hero))
    );
  }

  updateArea(area: Area): Observable<Area> {
    return this.httpClient.put<Area>(this.areasUrl, area, this.httpOptions).pipe(
      //catchError(this.handleError('updateHero', hero))
    );
  }

  deleteArea(id: number): Observable<Area> {
    const url = `${this.areasUrl}/${id}`; // DELETE api/heroes/42
    return this.httpClient.delete<Area>(url, this.httpOptions)
    .pipe(
    //  catchError(this.handleError('deleteHero'))
    );
  }

  getAreasByPermalink(permalink: string): Observable<Area>{
    return this.httpClient.get<Area>(`${this.areasUrl}/${permalink}`).pipe();
  }

}
