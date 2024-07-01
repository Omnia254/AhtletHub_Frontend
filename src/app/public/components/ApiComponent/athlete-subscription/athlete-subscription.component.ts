import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/public/Interfaces/coach/Subscription';
import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';

@Component({
  selector: 'app-athlete-subscription',
  templateUrl: './athlete-subscription.component.html',
  styleUrls: ['./athlete-subscription.component.scss']
})
export class AthleteSubscriptionComponent implements OnInit {

  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscribtionService) {}

  ngOnInit(): void {
    this.subscriptionService.getAthleteSubscriptions(true, 'Price', 'Ascending')
      .subscribe(subscriptions => {
        console.log(subscriptions);
        this.subscriptions = subscriptions;
      });
  }

}
