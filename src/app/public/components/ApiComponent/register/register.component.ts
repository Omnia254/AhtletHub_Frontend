import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserCommand } from 'src/app/public/Interfaces/User/RegisterUserCommand';
import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';
import { RegisterService } from 'src/app/public/services/ApIServices/register.service';
import { UploadingService } from 'src/app/public/services/ApIServices/uploading.service';
import { Router } from '@angular/router';

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
  emailValidator = '';
  confirmEmailValidator = '';
  usernameValidator = '';
  passwordValidator = '';
  confirmPasswordValidator = '';
  firstnameValidator = '';
  lastnameValidator = '';
  phoneNumberValidator = '';
  dobValidator = '';
  heightValidator = '';
  bioValidator = '';
  certValidator = '';
  emailRegex = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  phoneNumberRegex = /^(010|011|012)\d{8}$/;

  formValid:boolean = false;

  @HostBinding('class') dFlex = 'd-flex flex-column flex-grow-1';

  constructor(
    private http: HttpClient,
    private registerUserService: RegisterService,
    private sendEmailService: EmailService,
    private uploadSevice: UploadingService,
    private router: Router
  ) { }

  ValidateEmail(email:string){
    if(!this.emailRegex.test(email)){
      this.emailValidator = "Please enter a valid email address.";
    }
    else{
      this.emailValidator = '';
    }
  }
  ValidateConfirmEmail(email:string,confirmEmail:string){
    if(!this.emailRegex.test(confirmEmail)){
      this.confirmEmailValidator = "Please enter a valid email address.";
    }
    else if(email != confirmEmail){
      this.confirmEmailValidator = "Please make sure the email addresses match.";
    }
    else{
      this.confirmEmailValidator = '';
    }
  }

  ValidateUsername(username:string){
    if(username.length < 3){
      this.usernameValidator = "Username must be longer than 3 characters.";
    }
    else if(username.length > 100){
      this.usernameValidator = "Username must be shorter than 100 characters.";
    }
    else{
      this.usernameValidator = '';
    }
  }

  ValidatePassword(password:string){
    if(!this.passwordRegex.test(password) || password.length < 8){
      this.passwordValidator = "Passwords must be:\n-At least 8 characters long\n-Contain at least one letter, one number, and one special character.";
    }
    else{
      this.passwordValidator = '';
    }
  }

  
  ValidateConfirmPassword(password:string,confirmPassword:string){
    if(password != confirmPassword){
      this.confirmPasswordValidator = "Please make sure your passwords match.";
    }
    else{
      this.confirmPasswordValidator = '';
    }
  }

  ValidateFirstName(firstname:string){
    if(firstname.length < 3){
      this.firstnameValidator = "First name should be longer than 3 characters.";
    }
    else if (firstname.length > 100){
      this.firstnameValidator = "First name should be longer than 100 characters.";
    }
    else{
      this.firstnameValidator = '';
    }
  }
  
  ValidateLastName(lastname:string){
    if(lastname.length < 3){
      this.lastnameValidator = "Last name should be longer than 3 characters.";
    }
    else if (lastname.length > 100){
      this.lastnameValidator = "Last name should be longer than 100 characters.";
    }
    else{
      this.lastnameValidator = '';
    }
  }

  ValidatePhoneNumber(phoneNumber:string){
    if(!this.phoneNumberRegex.test(phoneNumber)){
      this.phoneNumberValidator = "Phone number must be 11 digits starting with 010|011|012.";
    }
    else{
      this.phoneNumberValidator = '';
    }
  }

  ValidateAge(age:string){
    const today = new Date();
    const enteredAge = new Date(age);
    const curAge = today.getFullYear() - enteredAge.getFullYear();
    if(curAge < 18){
      this.dobValidator = "Age must be above 18.";
    }
    else{
      this.dobValidator = '';
    }
  }

  ValidateBio(bio:string){
    if(bio != null && bio.length > 450){
      this.bioValidator = "Bio cannot be longer than 450 characters.";
    }
    else{
      this.bioValidator = '';
    }
  }

  ValidateHeight(height:number){
    if(height < 150){
      this.heightValidator = "Height must be taller than 150 cm.";
    }
    else if(height > 250){
      this.heightValidator = "Height must be shorter than 250 cm.";
    }
    else{
      this.heightValidator = '';
    }
  }

  ValidateForm(){
    if(!(
      (
      this.emailValidator != ''||
      this.confirmEmailValidator != ''||
      this.usernameValidator != ''||
      this.passwordValidator != ''||
      this.confirmPasswordValidator != ''||
      this.firstnameValidator != ''||
      this.lastnameValidator != ''||
      this.phoneNumberValidator != ''||
      this.dobValidator != ''||
      this.heightValidator != ''||
      this.bioValidator != '')
      ||
      (
        this.command.email == ''||
        this.command.confirmEmail == ''||
        this.command.firstName == ''||
        this.command.lastName == ''||
        this.command.password == ''||
        this.command.confirmPassword == ''||
        this.command.userName == ''||
        this.command.phoneNumber == ''||
        this.command.dateOfBirth == ''||
        (this.command.isCoach == false && this.command.height == undefined)||
        (this.command.isCoach == true && this.command.certificate == null)
      )
    )){
      this.formValid = true;
    }
  }

  
  onSubmit(): void {
    this.ValidateForm();
    if(!this.formValid){
      return;
    }
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
                this.router.navigate(["../public/login"]);
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




