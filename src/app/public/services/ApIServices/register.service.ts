
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUserCommand } from '../../Interfaces/User/RegisterUserCommand';
import { UserDto } from '../../Interfaces/User/UserDto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.baseUrl}`;// Replace with your API URL

  constructor(private http: HttpClient) {}

  register(user: RegisterUserCommand): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}register`, user);
  }
}
