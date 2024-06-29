import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortingDirection, Subscription } from 'src/app/public/Interfaces/coach/Subscription';
import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';
import { TokenService } from 'src/app/public/services/ApIServices/token.service';

@Component({
  selector: 'app-coach-subscription',
  templateUrl: './coach-subscription.component.html',
  styleUrls: ['./coach-subscription.component.scss']
})
export class CoachSubscriptionComponent implements OnInit {
  coachId: number = 0;
  subscriptions: Subscription[] = [];
  totalItems = 0;
  pageNumber = 1;
  pageSize = 10;
  sortBy = 'name';
  sortingDirection: SortingDirection = SortingDirection.Ascending; // Ensure SortingDirection is correctly imported and assigned

  constructor(
    private subscriptionService: SubscribtionService,
    private tokenService: TokenService,
    private route:ActivatedRoute
  ) {
    this.fetchEntityId();
  }

  ngOnInit(): void {
    this.coachId = +this.route.snapshot.paramMap.get('coachId')!;

    this.loadSubscriptions();
      }

  fetchEntityId() {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.coachId = entityId;
      console.log(this.coachId );

    } else {
      // Handle case where entityId is null
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions(
   
      this.coachId,
      this.pageNumber,
      this.pageSize,
      this.sortBy,
      this.sortingDirection,
    
    ).subscribe(result => {
      this.subscriptions = result.items;
      this.totalItems = result.totalItemsCount;
      console.log(this.subscriptions);
    });
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.loadSubscriptions();
  }

  onDirectionChange(direction: SortingDirection): void { // Ensure SortingDirection is used as a type here
    this.sortingDirection = direction;
    this.loadSubscriptions();
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadSubscriptions();
  }
}
