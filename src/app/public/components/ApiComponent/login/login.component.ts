import { Component, OnInit, Output, inject, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/ApIServices/auth.service';
import { AccountService } from '../../../services/ApIServices/account.service';
import { LoginInput, UserResponse } from '../../../interfaces';
import { IsCoachService } from 'src/app/public/services/ApIServices/is-coach.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: LoginInput = {
    userNameOrEmail: '',
    password: '',
  };
  validation = '';
  validationCoach = '';

  userResponse: UserResponse = {
    isValidCredentials: false,
    isActive: false,
    isApproved: false,
    isLockedOut: false,
    lockoutEnd: undefined, // Optional, as it is nullable in C#
    userNameOrEmail: '',
    roles: [],
    accessToken: '',
    accessTokenExpiration: new Date(),
    refreshTokenExpiration: new Date(),
  };
  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Use 12-hour time format with AM/PM
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService,
    private isCoachService:   IsCoachService
  ) {
  }



  newLogin() {

    this.accountService.login(this.user).subscribe({
      next: (res) => {
        this.userResponse = res;
        this.checkIfValid(res);
        const accessToken = res.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        } else {
            console.error('Access token is undefined');
        }
      
      },
      error: (error) => {
        this.validation = "Enter a valid password.";
      },
    });
  }
  setUserToken() {
    localStorage.setItem('user', JSON.stringify(this.userResponse));
  }


  isvaildlogin(userResponse: UserResponse): boolean {
    return false;
  }



    message = '';
    isCoach = false; 
    checkIfValid(userResponse: UserResponse) {
      if (userResponse.isValidCredentials) {
        if (userResponse.isActive) {
          if (userResponse.roles?.some((role) => role === 'coach')) {
            this.isCoachService.isCoach = true;
            if (userResponse.isApproved) {
              this.setUserToken();
              this.authService.loggingIn();
              this.router.navigate(['../homenav']);
            } else {
              this.validationCoach = 'Your documents are being approved, please wait for approval email.';
            }
          }else{
            this.setUserToken();
            this.isCoach = false;
            this.authService.loggingIn();
            this.router.navigate(['../home']);
          }
        }else{
          this.validation = 'Your account is deactivated, please contact the admin to reactivate it.';
        }
      }else if(userResponse.isLockedOut){
        console.log(userResponse.lockoutEnd);
        console.log(typeof userResponse.lockoutEnd);
        const lockoutEndDate = new Date(userResponse.lockoutEnd??"");
        this.validation = 'Your account is locked. You can login again after ' + lockoutEndDate.toLocaleTimeString('en-EG',this.options);
      }
      else {
        this.validation = 'Username/Email or password are incorrect.';
      }
    }

}
