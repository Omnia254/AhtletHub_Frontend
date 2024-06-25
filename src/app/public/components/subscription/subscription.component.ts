import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Coach, Subscription, SubscriptionFeature } from '../../interfaces';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  subscribedCoaches: Coach[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    const subscriptions: Subscription[] = this.subscriptionService.getSubscriptions();

    this.subscribedCoaches = subscriptions.map(subscription => {
      const coach: Coach = {
        id: subscription.coachId, // Assuming coachId maps to Coach's id
        firstName: '', // Provide an appropriate value based on your logic or default
        lastName: '',  // Provide an appropriate value based on your logic or default
        gender: 0,     // Provide an appropriate value based on your logic or default (0 for male, 1 for female, for example)
        dateOfBirth: '', // Provide an appropriate value based on your logic or default
        profilePicture: '', // Provide an appropriate value based on your logic or default
        bio:'',       // Provide an appropriate value based on your logic or default
        ratingsCount: 0, // Provide an appropriate value based on your logic or default
        overallRating: 0.0, // Provide an appropriate value based on your logic or default
        subscribtions: [
          {
            id: subscription.id,
            coachId: subscription.coachId,
            name: subscription.name,
            price: subscription.price,
            durationInMonths: subscription.durationInMonths,
            subscribtionsFeatures: subscription.subscribtionsFeatures // Assuming this is an array of SubscriptionFeature
          }
        ],
        coachesRatings: [] // Provide an appropriate default value if coachesRatings is an array
      };
      return coach;
    });
  }
}
