import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(http => {
        if (http instanceof HttpResponse) {
          if (http.status === 200 && http.body && http.body.token) {
            this.authService.setSession(http.body.token);
          }
        }
      })
    );
  }
}
