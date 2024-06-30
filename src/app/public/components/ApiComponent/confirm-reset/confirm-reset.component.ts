// confirm-reset.component.ts

import { Component } from '@angular/core';
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
        console.log(this.newPassword);
        console.log('Password reset confirmed successfully');
        // Handle success (e.g., show message to user)
      },
      error => {
        console.error('Error confirming reset:', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}
