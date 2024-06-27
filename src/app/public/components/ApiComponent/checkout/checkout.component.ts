import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { PaymentService } from 'src/app/public/services/ApIServices/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  price: number = 0;
  subscriptionName: string = '';
  athleteId: number = 0;
  subscriptionId: number = 0;

  constructor(private paymentService: PaymentService, private router: Router) {}

  createSession() {
    const request = {
      price: this.price,
      subscriptionName: this.subscriptionName,
      athleteId: this.athleteId,
      subscriptionId: this.subscriptionId
    };

    this.paymentService.createCheckoutSession(request).subscribe(response => {
      window.location.href = response.SessionUrl;
    });
  }
}
