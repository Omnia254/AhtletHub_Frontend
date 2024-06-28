// import { Component } from '@angular/core';
// import { RegisterUserCommand } from 'src/app/public/Interfaces/User/RegisterUserCommand';
// import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';
// import { EmailService } from 'src/app/public/services/ApIServices/email.service';

// import { RegisterService } from 'src/app/public/services/ApIServices/register.service';

// // import * as athleteTemplate from 'src/assets/EmailsTemplete/EmailConfirmationTempleteForAthlete.html'; 

// // import * as coachTemplate from 'src/assets/EmailsTemplete/EmailConfirmationTempleteForCoach.html'; 

// import athleteTemplate from 'src/assets/EmailsTemplete/EmailConfirmationTempleteForAthlete.html';
// import coachTemplate from 'src/assets/EmailsTemplete/EmailConfirmationTempleteForCoach.html';

// @Component({
//   selector: 'app-register-user',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {

//   command: RegisterUserCommand = {
//     email: '',
//     confirmEmail: '',
//     userName: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     gender: 0,
//     dateOfBirth: '',
//     height: undefined,// Assigning undefined instead of null
//     bio: null,
//     isCoach: false,
//     certificate: undefined, // Assigning undefined instead of null
//     clientEmailConfirmationUrl: ''
//   };

//   constructor(
//     private registerUserService: RegisterService,
//     private sendEmailService:EmailService
//   ) { }

//   onSubmit(): void {
//     const formData = new FormData();
//     formData.append('email', this.command.email);
//     formData.append('confirmEmail', this.command.confirmEmail);
//     formData.append('userName', this.command.userName);
//     formData.append('password', this.command.password);
//     formData.append('confirmPassword', this.command.confirmPassword);
//     formData.append('firstName', this.command.firstName);
//     formData.append('lastName', this.command.lastName);
//     formData.append('phoneNumber', this.command.phoneNumber);
//     formData.append('gender', this.command.gender.toString());
//     formData.append('dateOfBirth', this.command.dateOfBirth);
//     formData.append('height', this.command.height?.toString() ?? '');
//     formData.append('bio', this.command.bio ?? '');
//     formData.append('isCoach', this.command.isCoach.toString());
//     formData.append('clientEmailConfirmationUrl', 'http://localhost:4200/confirmemail');

//     if (this.command.certificate instanceof File) { // Check if certificate is a File object
//       formData.append('certificate', this.command.certificate, this.command.certificate.name);
//     }
//     console.log("Payload:",formData);
//     this.registerUserService.registerUser(formData).subscribe(
     
//       response => {
//         console.log('Registration successful:', response);
//         const templateUrlForAthlete = 'src/assets/EmailConfirmationTempleteForAthlete.html';
//         const templateUrlForCoach = 'src/assets/EmailConfirmationTempleteForCoach.html';
        
//         const sendemailformData = new FormData();
//         sendemailformData.append('mailTo', response.userEmailToConfirm);
//         sendemailformData.append('subject', 'AthleteHub Email Confirmation');
//         sendemailformData.append('messageBodyType', MessageBodyType.Html);
//         sendemailformData.append('link', response.emailConfirmationLink);
//         sendemailformData.append('linkPlaceHolder', 'confirmationlinkplaceholder');
//         // const templateContent = response.roles.includes('coach') ?
//         //  coachTemplate : athleteTemplate;
    
//         let templateContent = '';

//         if (response.roles.includes('coach')) {
//           templateContent = coachTemplate;
//         } else {
//           templateContent = athleteTemplate;
//         }

//         sendemailformData.append('body', templateContent);

//         this.sendEmailService.sendEmail(sendemailformData).subscribe(
//           _response => {
//             console.log('Send Email successful');
//           },
//           error => {
//             console.error('Send Email failed:', error);
//           }
  
//         );

//       },
//       error => {
//         console.error('Registration failed:', error);
//       }
//     );
//   }

//   onFileSelected(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files?.length) {
//       this.command.certificate = inputElement.files[0];
//     }
//   }

//   resetForm(): void {
//     this.command = {
//       email: '',
//       confirmEmail: '',
//       userName: '',
//       password: '',
//       confirmPassword: '',
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       gender: 0,
//       dateOfBirth: '',
//       height: undefined, // Reset to undefined
//       bio: null,
//       isCoach: false,
//       certificate: undefined, // Reset to undefined
//       clientEmailConfirmationUrl: ''
//     };
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserCommand } from 'src/app/public/Interfaces/User/RegisterUserCommand';
import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';
import { RegisterService } from 'src/app/public/services/ApIServices/register.service';
import { UploadingService } from 'src/app/public/services/ApIServices/uploading.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  coachId!: number ;
  command: RegisterUserCommand = {
    email: '',
    confirmEmail: '',
    userName: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: 0,
    dateOfBirth: '',
    height: undefined, // Assigning undefined instead of null
    bio: null,
    isCoach: false,
    certificate: undefined, // Assigning undefined instead of null
    clientEmailConfirmationUrl: ''
  };

  constructor(
    private http: HttpClient,
    private registerUserService: RegisterService,
    private sendEmailService: EmailService,
    private uploadSevice: UploadingService
  ) { }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('email', this.command.email);
    formData.append('confirmEmail', this.command.confirmEmail);
    formData.append('userName', this.command.userName);
    formData.append('password', this.command.password);
    formData.append('confirmPassword', this.command.confirmPassword);
    formData.append('firstName', this.command.firstName);
    formData.append('lastName', this.command.lastName);
    formData.append('phoneNumber', this.command.phoneNumber);
    formData.append('gender', this.command.gender.toString());
    formData.append('dateOfBirth', this.command.dateOfBirth);
    formData.append('height', this.command.height?.toString() ?? '');
    formData.append('bio', this.command.bio ?? '');
    formData.append('isCoach', this.command.isCoach.toString());
    formData.append('clientEmailConfirmationUrl', 'http://localhost:4200/confirmemail');

    if (this.command.certificate instanceof File) { // Check if certificate is a File object
      formData.append('certificate', this.command.certificate, this.command.certificate.name);
    }
    console.log(this.command.email,this.command.confirmEmail,this.command.firstName,this.command.lastName,
      this.command.phoneNumber,this.command.gender.toString(),this.command.dateOfBirth,
      this.command.height?.toString() ?? '',this.command.bio ?? '', this.command.isCoach.toString()
    
      ,this.command.certificate);
    this.registerUserService.registerUser(formData).subscribe(
      response => {

        
        console.log('Registration successful:', response);
        let templateUrl ='';
        if(response.roles.includes('coach'))
        {
             
            this.coachId = response.entityId; 

            this.onUpload();
            templateUrl ='assets/EmailsTemplete/EmailConfirmationTempleteForCoach.html';
        }
        else
        {
           templateUrl ='assets/EmailsTemplete/EmailConfirmationTempleteForAthlete.html';
        }
        this.http.get(templateUrl, { responseType: 'text' }).subscribe(
          templateContent => {


            const sendEmailFormData = new FormData();
            sendEmailFormData.append('mailTo', response.userEmailToConfirm);
            sendEmailFormData.append('subject', 'AthleteHub Email Confirmation');
            sendEmailFormData.append('messageBodyType', MessageBodyType.Html);
            sendEmailFormData.append('link', response.emailConfirmationLink);
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
      error => {
        console.error('Registration failed:', error);
      }
    );
  }

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files?.length) {
  //     this.command.certificate = inputElement.files[0];
  //   }
  // }

  resetForm(): void {
    this.command = {
      email: '',
      confirmEmail: '',
      userName: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: 0,
      dateOfBirth: '',
      height: undefined, // Reset to undefined
      bio: null,
      isCoach: false,
      certificate: undefined, // Reset to undefined
      clientEmailConfirmationUrl: ''
    };
  }

  onFileSelected(event: any) {
    console.log("onFileSelectedsucess");
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.command.certificate = inputElement.files[0];

    }
  }
  onUpload() {
    if (this.command.certificate) {
        console.log(this.command.certificate);
        console.log(this.coachId);
      this.uploadSevice.uploadCertificate(this.coachId, this.command.certificate).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response.sasUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
}




