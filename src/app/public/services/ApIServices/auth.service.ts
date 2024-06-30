import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLoginResponseDto } from '../../Interfaces/User/UserLoginResponseDto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5068/api/';
  private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient,private tokenService: TokenService) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = this.tokenService.extractEntityIdFromToken();
    this.loggedIn.next(!!token);
  }

  get isLoggedIn(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  loggingIn():void{
    this.loggedIn.next(true);
  }

  loggingOut():void{
    this.loggedIn.next(false);
  }

  login(userNameOrEmail: string, password: string): Observable<UserLoginResponseDto> {
    const loginData = { userNameOrEmail, password };
    return this.http.post<UserLoginResponseDto>(`${this.apiUrl}identity/login`, loginData,{withCredentials:true}).pipe(
      tap(response => {
        if (response.isValidCredentials) {
          this.storeLoginResponse(response);
        }
      })
    );
  }

  private storeLoginResponse(response: UserLoginResponseDto): void {
    console.log(response);
    localStorage.setItem('loginResponse', JSON.stringify(response));
    
    if (response.accessTokenExpiration && response.refreshTokenExpiration) {
      const accessTokenExpires = new Date(response.accessTokenExpiration);
      const refreshTokenExpires = new Date(response.refreshTokenExpiration);
      
      document.cookie = `accessToken=${response.accessToken};expires=${accessTokenExpires.toUTCString()};path=/`;
      console.log(document.cookie);

      document.cookie = `refreshToken=${response.refreshToken};expires=${refreshTokenExpires.toUTCString()};path=/`;
    } else {
      console.error('Invalid expiration dates received in login response');
    }
  }
  
  getLoginResponse(): UserLoginResponseDto | null {
    const storedResponse = localStorage.getItem('loginResponse');
    console.log("hi  ",storedResponse);
    if (!storedResponse) return null;
  
    const response: UserLoginResponseDto = JSON.parse(storedResponse);
    console.log("hi response ",storedResponse);

    // Retrieve cookies
    const cookies = document.cookie.split('; ');
    let accessToken: string | undefined = undefined;
    let refreshToken: string | undefined = undefined;
    let accessTokenExpiration: Date | undefined = undefined;
    let refreshTokenExpiration: Date | undefined = undefined;
  
    for (const cookie of cookies) {
      const parts = cookie.split('=');
      if (parts[0] === 'accessToken') {
        accessToken = parts[1];
      } else if (parts[0] === 'refreshToken') {
        refreshToken = parts[1]; // Ensure refreshToken is correctly assigned here
      }
    }
  
    // Parse expiration dates from cookies if available
    if (accessToken && refreshToken) {
      accessTokenExpiration = this.getCookieExpiration('accessToken');
      refreshTokenExpiration = this.getCookieExpiration('refreshToken');
    }
  
    // Assign values back to response if valid
    if (accessTokenExpiration && refreshTokenExpiration) {
      response.accessToken = accessToken;
      response.refreshToken = refreshToken;
      response.accessTokenExpiration = new Date(accessTokenExpiration);
      response.refreshTokenExpiration = new Date(refreshTokenExpiration);
    } else {
      console.error('Invalid cookies detected');
    }
  
    return response;
  }
  
  private getCookieExpiration(cookieName: string): Date | undefined {
    const cookies = document.cookie.split(';'); // Split by ';'
    console.log(cookies);
    
    for (const cookie of cookies) {
      const parts = cookie.trim().split('=');
      if (parts[0] === cookieName) {
        return new Date(parts[1]); // Parse as Date
      }
    }
    
    return undefined;
  }
  
  
  

  clearLoginResponse(): void {
    localStorage.removeItem('loginResponse');
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }

  revokeToken(): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}identity/revokeToken`, {});
  }
}
