import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private subscriptions: BehaviorSubject<Subscription[]> = new BehaviorSubject<Subscription[]>([]);
  
  getSubscriptions(): Observable<Subscription[]> {
    return this.subscriptions.asObservable();
  }

  constructor(private snackbar: MatSnackBar) { }

  createPaymentSession(subscription: Subscription): Observable<{ sessionId: string }> {
    const sessionId = `fake-session-id-${subscription.id}`;
    this.snackbar.open('Creating payment session...', 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });
    return of({ sessionId });
  }

  mockRedirectToCheckout(sessionId: string): void {
    console.log(`Redirecting to checkout with session ID: ${sessionId}`);
    this.snackbar.open('Redirecting to payment...', 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });

    // Simulate payment success
    setTimeout(() => {
      const subscribedSubscription = this.subscriptions.getValue().find(sub => sessionId.includes(sub.id.toString()));
      if (subscribedSubscription) {
        const currentSubscriptions = this.subscriptions.getValue();
        currentSubscriptions.push(subscribedSubscription);
        this.subscriptions.next(currentSubscriptions);
        this.snackbar.open('Payment successful!', 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        });
      }
    }, 2000);
  }

  addSubscription(subscription: Subscription): void {
    const currentSubscriptions = this.subscriptions.getValue();
    currentSubscriptions.push(subscription);
    this.subscriptions.next(currentSubscriptions);
  }
}
