import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/public/services/ApIServices/user.service';


@Component({
  selector: 'app-confirm-change-email',
  templateUrl: './confirm-change-email.component.html',
  styleUrls: ['./confirm-change-email.component.scss']
})


export class ConfirmChangeEmailComponent {

  //confirmChangeEmailForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;


  constructor(private fb: FormBuilder, private emailService: UserService,private _route:ActivatedRoute) {
    // this.confirmChangeEmailForm = this.fb.group({
    //   userEmailToConfirm: ['', [Validators.required, Validators.email]],
    //   token: ['', Validators.required]
    // });
  }


  ngOnInit() {
    this.confirmEmail();
    }

    private confirmEmail = () => {
  
      const useroldemail = this._route.snapshot.queryParams['oldemail'];
      const token = this._route.snapshot.queryParams['token'];
      const email = this._route.snapshot.queryParams['newemail'];
      console.log(useroldemail,token,email);
        this.emailService.confirmChangeEmail(useroldemail,email, token)
          .subscribe({
           
            next: () => {
              this.successMessage = 'Email change confirmed successfully.';
              this.errorMessage = undefined;
            },
            error: err => {
              console.log(err);
              this.successMessage = undefined;
              this.errorMessage = err.error || 'An error occurred while confirming email change.';
            }
          });
    }


    
}

