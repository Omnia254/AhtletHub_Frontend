import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user = true;
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const someservice = '';
    // if (this.user) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Bearer ${someservice.token}` },
    //   });
    // }

    return next.handle(request);
  }
}
