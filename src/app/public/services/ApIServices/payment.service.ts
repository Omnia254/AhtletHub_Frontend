import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:5068/api/Payment';

  constructor(private http: HttpClient) { }

  createCheckoutSession(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-checkout-session`, request);
  }

  getSuccess(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Success?sessionId=${sessionId}`);
  }
}
