import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent {
  emailForm: FormGroup;

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      mailTo: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      attachments: [null],
      messageBodyType: ['Html'],
      link: [''],
      linkPlaceHolder: ['']
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.emailForm.value).forEach(key => {
      if (key === 'attachments') {
        const files = this.emailForm.value[key];
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]);
          }
        }
      } else {
        formData.append(key, this.emailForm.value[key]);
      }
    });

    this.emailService.sendEmail(formData).subscribe(
      () => {
        // Handle success, e.g., show success message
        console.log('Email sent successfully!');
      },
      error => {
        // Handle error, e.g., show error message
        console.error('Error sending email:', error);
      }
    );
  }
}
