import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from 'src/app/public/Interfaces/User/ChangePasswordRequest';
import { UserService } from 'src/app/public/services/ApIServices/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private changePasswordService: UserService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const request: ChangePasswordRequest = this.changePasswordForm.value;
      this.changePasswordService.changePassword(request).subscribe({
        next: () => {
          this.router.navigate(['../logout']);

          // Handle successful password change
          alert('Password changed successfully');
        },
        error: (error) => {
          // Handle error
          alert('Error changing password: ' + error.message);
        }
      });
    }
  }
}
