import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  }

  isConnected(): boolean {
    if (localStorage.getItem(TOKEN_KEY)) return true;
    return false;
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }

}