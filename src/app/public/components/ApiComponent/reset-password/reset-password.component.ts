import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';
import { ResetPasswordService } from 'src/app/public/services/ApIServices/reset-password.service';
import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  confirmationUrl: string = 'http://localhost:4200/confirmresetpassword'; // Set your dynamic or constant value here

  constructor(
    private resetPasswordService: ResetPasswordService,
    private http: HttpClient,
    private sendEmailService: EmailService
  ) {}

  ngOnInit(): void {}

  initiateReset(): void {
    console.log(this.email, this.confirmationUrl)
    this.resetPasswordService.initiateReset(this.email, this.confirmationUrl).subscribe(
      (data) => {
        const templateUrl = 'assets/EmailsTemplete/EmailConfirmationTempleteForCoach.html';
      
        console.log( data.userEmailToConfirm);
        this.http.get(templateUrl, { responseType: 'text' }).subscribe(
          templateContent => {
            const sendEmailFormData = new FormData();
            sendEmailFormData.append('mailTo', data.userEmailToConfirm);
            sendEmailFormData.append('subject', 'AthleteHub Email Confirmation');
            sendEmailFormData.append('messageBodyType', MessageBodyType.Html);
            sendEmailFormData.append('link', data.passwordResetLink);
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
        console.log('Reset initiated successfully');
      },
      error => {
        console.error('Error initiating reset:', error);
      }
    );
  }
}
