// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   user = true;
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const someservice = '';
//     // if (this.user) {
//     //   request = request.clone({
//     //     setHeaders: { Authorization: `Bearer ${someservice.token}` },
//     //   });
//     // }

//     return next.handle(request);
//   }
// }


// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpEvent,
//   HttpRequest,
//   HttpHandler,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Clone the request to add the withCredentials flag
//     const authReq = req.clone({
//       withCredentials: true, // Ensure credentials are sent with the request
//       url: environment.baseUrl + req.url, // Prefix base URL
//     });

//     // Pass the cloned request instead of the original request to the next handle
//     return next.handle(authReq);
//   }
// }


import { Injectable } from '@angular/core';
import {   HttpInterceptor,   HttpEvent,   HttpRequest,   HttpHandler, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {  
   constructor() {}   
   intercept(  req: HttpRequest<any>,     next: HttpHandler  ): Observable<HttpEvent<any>> 
   {     // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');   
          // Clone the request to add the new header
          let authReq = req.clone({ url:  req.url,
             // Prefix base URL    
             });     
             if (token) 
              { authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}`, }, }); }
              // Pass the cloned request instead of the original request to the next handle
              return next.handle(authReq); } }
 