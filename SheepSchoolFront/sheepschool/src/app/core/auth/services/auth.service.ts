import { LocalUser } from './../models/local-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  authenticate(email: string, password: string) {
    return this.httpClient.post<LocalUser>(`${environment.apiUrl}/login`, { email, password }, httpOptions)
      .pipe(map(response => {
        this.tokenStorageService.saveToken(JSON.stringify(response.headers.get('Authorization')));
        //Role do usuario
        console.log(response.headers.get('role'));
        return response;
      }));
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}