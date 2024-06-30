import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/public/services/ApIServices/register.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  showSuccess!: boolean;
  showError!: boolean;
  errorMessage!: string;
  @HostBinding('class') dFlex = 'd-flex flex-grow-1';
  constructor(private _route: ActivatedRoute,private authService:RegisterService) 
  { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    
    
    this.authService.confirmEmail(token, email)
    .subscribe({
      next: (_) => this.showSuccess = true,
      error: (err:HttpErrorResponse ) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}
