// confirm-reset.component.ts

import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/public/services/ApIServices/reset-password.service';

@Component({
  selector: 'app-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.scss']
})
export class ConfirmResetComponent {


  newPassword: string = '';
  confirmNewPassword: string = '';
  successMessage: string ='';
  errorMessage: string ='';
  @HostBinding('class') dFlex = 'd-flex flex-grow-1';

  constructor(private resetPasswordService: ResetPasswordService,private _route:ActivatedRoute,
    private router: Router
  ) {
    this.confirmReset();
   }

  confirmReset(): void {
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    this.resetPasswordService.confirmReset(token, email, this.newPassword, this.confirmNewPassword).subscribe(
      () => {
        this.router.navigate(['../logout']);
        this.successMessage = 'Password reset confirmed successfully.';
      },
      error => {
        this.errorMessage = 'The password was not reset. Please try again.';
      }
    );
  }
}
