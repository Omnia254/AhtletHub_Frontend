import { Injectable } from '@angular/core';
import { Subscription } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptions: Subscription[] = [];

  constructor() {}

  addSubscription(subscription: Subscription): void {
    if (!this.subscriptions.some(sub => sub.id === subscription.id)) {
      this.subscriptions.push(subscription);
    }
  }

  getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }
}
