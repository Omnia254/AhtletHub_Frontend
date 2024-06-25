import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  processPayment(): void {
    // Simulate payment process with a random success/failure
    setTimeout(() => {
      const paymentSuccess = Math.random() > 0.5; // 50% chance of success or failure

      if (paymentSuccess) {
        this.snackbar.open('Payment Successful', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        // Navigate to a success or subscription page
        this.router.navigate(['/home']);
      } else {
        this.snackbar.open('Payment Failed', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    }, 2000); // Simulate a 2-second payment process
  }
}
