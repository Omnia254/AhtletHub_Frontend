import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coach, Subscription } from '../../interfaces';
import { CoachService } from '../../services/coach.service'; // Adjust based on your service
import { SubscriptionService } from '../../services/subscription.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.scss']
})
export class CoachDetailsComponent implements OnInit {
  coachId!: number;
  coach!: Coach;

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService, // Use actual CoachService
    private subscriptionService: SubscriptionService,
    private paymentService: PaymentService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const coachIdParam = params.get('coachId');
      if (coachIdParam !== null) {
        this.coachId = +coachIdParam; // Convert to number
        this.loadCoachDetails();
      } else {
        console.error('Coach ID parameter is null or invalid.');
      }
    });
  }

  loadCoachDetails(): void {
    this.coachService.getCoach(this.coachId).subscribe(coach => {
      this.coach = coach;
    });
  }

  addToSubscriptionList(subscription: Subscription): void {
    if (!this.isSubscribed(subscription)) {
      this.subscriptionService.addSubscription(subscription);
    }
  }

  isSubscribed(subscription: Subscription): boolean {
    return this.subscriptionService.getSubscriptions().some(sub => sub.id === subscription.id);
  }

}
