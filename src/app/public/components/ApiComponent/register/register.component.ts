import { Component } from '@angular/core';
import { RegisterUserCommand } from 'src/app/public/Interfaces/User/RegisterUserCommand';

import { RegisterService } from 'src/app/public/services/ApIServices/register.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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

  constructor(private registerUserService: RegisterService) { }

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
    formData.append('clientEmailConfirmationUrl', this.command.clientEmailConfirmationUrl);

    if (this.command.certificate instanceof File) { // Check if certificate is a File object
      formData.append('certificate', this.command.certificate, this.command.certificate.name);
    }

    this.registerUserService.registerUser(formData).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Optionally reset the form after successful registration
        this.resetForm();
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.command.certificate = inputElement.files[0];
    }
  }

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
}
