import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AccountService } from '../../../services/ApIServices/account.service';
import { LoginInput, UserResponse } from '../../../interfaces';

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
    //Athletid
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService
  ) {
    console.log('hhh');
  }

  // login() {
  //   if (!this.loginForm.valid) {
  //     return;
  //   }
  //   this.authService
  //     .login(this.loginForm.value)
  //     .pipe

  //     // route to protected/dashboard, if login was successfull
  //     // tap(() => this.router.navigate(['../../home']))
  //     ()
  //     .subscribe();

  //   console.log(this.loginForm.value);
  // }

  newLogin() {
    console.log('kkk');

    console.log(this.user);

    this.accountService.login(this.user).subscribe({
      next: (res) => {
        this.userResponse = res;
        console.log(res);
        
        this.checkIfValid(res);



        const accessToken = res.accessToken;
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
         } else {
             console.error('Access token is undefined');
         }
      
      },
      error: (error) => console.log(error),
    });
  }
  setUserToken() {
    localStorage.setItem('user', JSON.stringify(this.userResponse));
  }


  isvaildlogin(userResponse: UserResponse): boolean {
    return false;

    // if isvalid crednital --> if islocked ? show lockout end,
    // if not chehck if isactive
    //     if is active, check if roles.contains(coach)
    //     if is coach && isapproaved --> login
    //     if is not coach --> log in to active
  }
  //   check(test:any)
  //   {
  // if(test.isValidCredentials)
  //   {
  //     {if(test.isActive)}
  //     {
  //       if(test.roles.contains("coach"))
  //         {
  //           if(test.isapproaved)
  //                //log him in
  //           else
  //              //show wait for approval please
  //       }
  //       else
  //          //log him in
  //     }
  //        //redirect to activation page
  //   }
  //   else
  //   {
  //     test.islocked== null //show invalid credintals + tell user he is locked untill
  //Test.lockoutEnd,
  //                          // other wise just show invalid credintals
  //   }
  //     }
  message = '';
  checkIfValid(userResponse: UserResponse) {
    if (userResponse.isValidCredentials) {
      if (userResponse.isActive) {
        if (userResponse.roles?.some((c) => c == 'coach')) {
          if (userResponse.isApproved) this.setUserToken();
          else this.message = 'show wait for approval please message';
          this.router.navigate(['../../home']);
        }
        else {
           this.setUserToken();
         console.log("ssssssssss")
          this.router.navigate(['../../coaches']);
        }


      }
    } else this.message = 'other wise just show invalid credintals';
  }

  logOut()
  {

    console.log("logout");
    this.accountService.revokeToken().subscribe({

      next: res => {
          if(res == true){
            this.removeToken();
            this.router.navigate(['../../home']);

          }
      }
    });
  }

  removeToken()
  {
    localStorage.clear();
  }

}
