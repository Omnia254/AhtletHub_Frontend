import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailConfirmationResponseDto } from 'src/app/public/Interfaces/User/EmailConfirmationResponseDto';
import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';
import { UserService } from 'src/app/public/services/ApIServices/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent {

  changeEmailForm: FormGroup;
  response: EmailConfirmationResponseDto | undefined;
  error: string | undefined;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private emailService: UserService,
    private sendEmailService: EmailService,
    private router: Router
  ) {
    // Dynamically set clientEmailChangingConfirmationUrl based on logic or constants
    const confirmationUrl = 'http://localhost:4200/confirmchangeemail'; // Set your dynamic or constant value here

    this.changeEmailForm = this.fb.group({
      currentEmail: ['', [Validators.required, Validators.email]],
      newEmail: ['', [Validators.required, Validators.email]],
      confirmNewEmail: ['', [Validators.required, Validators.email]],
      clientEmailChangingConfirmationUrl: [confirmationUrl, Validators.required]
    });
  }

  onSubmit() {
    if (this.changeEmailForm.valid) {
      const { currentEmail, newEmail, confirmNewEmail, clientEmailChangingConfirmationUrl } = this.changeEmailForm.value;
      this.emailService.changeEmail(currentEmail, newEmail, confirmNewEmail, clientEmailChangingConfirmationUrl)
       
      .subscribe({
          next: (data: EmailConfirmationResponseDto) => {
            this.router.navigate(['../logout']);

            this.response = data;
           

            let templateUrl = 'assets/EmailsTemplete/EmailConfirmationTempleteForCoach.html';

            this.http.get(templateUrl, { responseType: 'text' }).subscribe(
              templateContent => {
                const sendEmailFormData = new FormData();
                sendEmailFormData.append('mailTo', data.userEmailToConfirm);
                sendEmailFormData.append('subject', 'AthleteHub Email Confirmation');
                sendEmailFormData.append('messageBodyType', MessageBodyType.Html);
                sendEmailFormData.append('link', data.emailConfirmationLink);
                sendEmailFormData.append('linkPlaceHolder', 'confirmationlinkplaceholder');
                sendEmailFormData.append('body', templateContent);

                this.sendEmailService.sendEmail(sendEmailFormData).subscribe(
                  _response => {
                    console.log('Send Email successful');
                  },
                  error => {
                    console.error('Send Email failed:', error);
                  }
                );
              },
              error => {
                console.error('Failed to load email template:', error);
              }
            );
          },
          error: err => {
            this.response = undefined;
            this.error = err.error || 'An error occurred';
          }
        });
    }
  }
}
