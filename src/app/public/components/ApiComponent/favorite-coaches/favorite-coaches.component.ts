// favorite-coaches.component.ts

import { Component, OnInit, HostBinding } from '@angular/core';
import { CoachesService } from 'src/app/public/services/ApIServices/coaches.service';
import { CoachDto, PaginatedResult, Gender } from 'src/app/public/interfaces'; // Adjust path as necessary

@Component({
  selector: 'app-favorite-coaches',
  templateUrl: './favorite-coaches.component.html',
  styleUrls: ['./favorite-coaches.component.scss']
})
export class FavoriteCoachesComponent implements OnInit {
  favoriteCoaches: CoachDto[] = [];
  totalItemsCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
 // athleteId: number = 1; // Update this with your logic to get athleteId
  Gender = Gender;
  @HostBinding('class') dFlex = 'd-flex flex-grow-1';

  constructor(private coachService: CoachesService) {}

  ngOnInit(): void {
    this.loadFavoriteCoaches();
  }

  

  loadFavoriteCoaches(): void {
    this.coachService.getFavoriteCoaches(0, this.currentPage, this.pageSize)
      .subscribe({
        next: (result: PaginatedResult<CoachDto>) => {
          this.favoriteCoaches = result.items;
          this.totalItemsCount = result.totalItemsCount;
        },
        error: (err) => {
          console.error('Error fetching favorite coaches:', err);
        }
      });
  }

  
}
