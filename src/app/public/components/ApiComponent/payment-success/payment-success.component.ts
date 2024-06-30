// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-payment-success',
//   templateUrl: './payment-success.component.html',
//   styleUrls: ['./payment-success.component.scss']
// })
// export class PaymentSuccessComponent implements OnInit {


//   sessionId: string | null = null;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
    
//     this.route.queryParamMap.subscribe(params => {
//       this.sessionId = params.get('sessionId');
//       console.log('Session ID:', this.sessionId);
//       // You can now use sessionId as needed
//     });
//   }
  
// }


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AthleteActiveSubscribtionDtos } from 'src/app/public/Interfaces/Athlete/AthleteActiveSubscribtionDto';
import { SubscribeCommandforAthlete } from 'src/app/public/Interfaces/Athlete/SubscribeCommand';
import { MessageBodyType } from 'src/app/public/Interfaces/User/SendEmailCommand';
import { EmailService } from 'src/app/public/services/ApIServices/email.service';
import { SubscribeService } from 'src/app/public/services/ApIServices/subscribe.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  confirmationUrl: string = 'http://localhost:4200/confirmresetpassword'; // Set your dynamic or constant value here

  constructor(private route: ActivatedRoute, 
    private subscribeService: SubscribeService,
    private http:HttpClient,
    private sendEmailService:EmailService,
    private router: Router

     
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.sessionId = params.get('sessionId');
      console.log('Session ID:', this.sessionId);
      if (this.sessionId) {
        const subscribeCommand: SubscribeCommandforAthlete  = {
          sessionId: this.sessionId,
        };

        this.subscribeAndPayment(subscribeCommand).subscribe({
          next: (response:AthleteActiveSubscribtionDtos) => {

            const templateUrl = 'assets/EmailsTemplete/SucribtionTemplete.html';
            this.http.get(templateUrl, { responseType: 'text' }).subscribe(
              templateContent => {
                const sendEmailFormData = new FormData();
                sendEmailFormData.append('mailTo',response.athleteEmail);
                sendEmailFormData.append('subject', 'AthleteHub Email Confirmation');
                sendEmailFormData.append('messageBodyType', MessageBodyType.Html);
             //   sendEmailFormData.append('link', data.passwordResetLink);
               // sendEmailFormData.append('linkPlaceHolder', 'confirmationlinkplaceholder');
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

            
            console.log('Subscription successful:', response);
          },
          error: (error) => {
            console.error('Subscription error:', error);
          }
        });
      }
    });
  }

  subscribeAndPayment(subscribeCommand: SubscribeCommandforAthlete): Observable<AthleteActiveSubscribtionDtos> {
    return this.subscribeService.subscribeAndPayement(subscribeCommand);
  }
}
