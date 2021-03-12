import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../auth/services/token-storage.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
      request = request.clone({
        setHeaders: {
          Authorization: `${JSON.parse(this.tokenStorageService.getToken())}`
        }
      });    
    return next.handle(request);
  }
}

export const JWTInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JWTInterceptor,
  multi: true
}