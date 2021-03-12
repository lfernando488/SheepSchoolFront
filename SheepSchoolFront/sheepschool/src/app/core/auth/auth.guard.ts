import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    
    if (!this.tokenStorageService.isConnected()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  
}
