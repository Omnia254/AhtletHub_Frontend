// src/app/login-user/login-user.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginResponseDto } from 'src/app/public/Interfaces/User/UserLoginResponseDto';
import { AuthService } from 'src/app/public/services/ApIServices/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  userNameOrEmail: string = '';
  password: string = '';
  loginResponse: UserLoginResponseDto | null = null;
  errorMessage?: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.userNameOrEmail, this.password).subscribe({
      next: (response) => {
        this.loginResponse = response;
        if (response.isValidCredentials) {
          console.log('Login successful. Tokens stored in cookies.');
          const accessToken = response.accessToken;
          if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
           } else {
               console.error('Access token is undefined');
           }
          this.getStoredLoginResponse();

        } else {
          this.errorMessage = 'Invalid credentials.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again later.';
        console.error('Login error', error);
      }
    });
  }

  logout() {
    console.log('Logged out ');
    this.authService.revokeToken().subscribe({
      next: (response) => {
        console.log('Token revocation response:', response);
        if (response) {
          this.authService.clearLoginResponse();
          this.loginResponse = null;
          this.userNameOrEmail = '';
          this.password = '';
          console.log('Logged out and cookies cleared.');
          this.router.navigate(['../../home']);
        } else {
          this.errorMessage = 'Failed to revoke token.';
        }
      },
      error: (error) => {
        console.error('Token revocation error', error);
        this.errorMessage = 'Failed to log out. Please try again later.';
      }
    });
  }

  getStoredLoginResponse() {
    this.loginResponse = this.authService.getLoginResponse();
  }
}
