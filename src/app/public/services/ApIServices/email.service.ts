import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.baseUrl}Utility/sendEmail`;

  constructor(private http: HttpClient) {}

  sendEmail(formData: FormData): Observable<void> {
    return this.http.post<void>(this.apiUrl, formData);
  }
}
