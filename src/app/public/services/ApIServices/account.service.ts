import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInput, UserResponse } from '../../interfaces';
import { RevokeTokenResponseDTO } from '../../Interfaces/User/RevokeTokenResponseDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http = inject(HttpClient);
  //baseUrl = environment.baseUrl;
  private apiUrl = `${environment.baseUrl}`;

  login(user: LoginInput) {
    return this.http.post<UserResponse>(`${this.apiUrl}identity/login`, user,{ withCredentials: true });
  }

  revokeToken() {
    return this.http.post<RevokeTokenResponseDTO>(`${this.apiUrl}identity/revokeToken`, {}, { withCredentials: true });  }
  
}
