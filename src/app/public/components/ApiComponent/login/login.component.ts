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
  // accountService = inject(AccountService);
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required]),
  // });

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


 // Manually set athleteId for testing
 const athleteId = '1'; // Replace with the athleteId you want to test
 localStorage.setItem('athleteId', athleteId);

 //const athleteId = this.userResponse.athleteId;
 //localStorage.setItem('athleteId', athleteId.toString());
        // const athleteId = localStorage.getItem('athleteId');
       // const athleteId = "1";
      
      },
      error: (error) => console.log(error),
    });
  }
  //{"isValidCredentials":false,"isActive":false,"isApproved":true,"isLockedOut":false,"lockoutEnd":null,"userNameOrEmail":"mostafaayman628@yahoo.com","roles":null,"accessToken":null,"accessTokenExpiration":null,"refreshTokenExpiration":"0001-01-01T00:00:00"}
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
         
          this.router.navigate(['../../payment']);
        }


      }
    } else this.message = 'other wise just show invalid credintals';
  }

  logOut()
  {
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
