import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInput, UserResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  login(user: LoginInput) {
    return this.http.post<UserResponse>(this.baseUrl + 'identity/login', user,{ withCredentials: true });
  }

  revokeToken() {
    return this.http.post<boolean>(this.baseUrl + 'identity/revokeToken', {});
  }
}
