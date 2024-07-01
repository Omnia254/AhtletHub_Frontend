import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortingDirection, Subscription } from 'src/app/public/Interfaces/coach/Subscription';
import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';
import { TokenService } from 'src/app/public/services/ApIServices/token.service';
import { Router } from '@angular/router';

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
  totalPages = 0;
  sortingDirection: SortingDirection = SortingDirection.Ascending; // Ensure SortingDirection is correctly imported and assigned
  @HostBinding('class') dFlex = 'd-flex flex-column flex-grow-1';

  constructor(
    private subscriptionService: SubscribtionService,
    private tokenService: TokenService,
    private route:ActivatedRoute,
    private router : Router
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
      this.router.navigate(["../public/login"])
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
      this.totalPages = Math.floor(this.totalItems/this.pageSize) < 1? 1 : Math.floor(this.totalItems/this.pageSize);
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
