import { Component, OnInit } from '@angular/core';
import { CoachDto, PaginatedResult, SortingDirection } from '../../interfaces';
import { CoachesService } from '../../services/coaches.service';


@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: CoachDto[] = [];
  totalItemsCount = 0;
  totalPages = 0;
  itemsFrom = 0;
  itemsTo = 0;
  hasNextPage = false;
  hasPreviousPage = false;
  currentPage = 1;
  pageSize = 10;

  constructor(private coachService: CoachesService) {}

  ngOnInit(): void {
    this.getAllCoaches();
  }

  getAllCoaches(queryParams: any = {}): void {
    const query = {
      pageSize: 5,
      pageNumber: 1,
      includeCoachesRatings:false,
      sortingDirection:SortingDirection.Ascending,
      ...queryParams // Merge any additional query parameters
    };

    this.coachService.getAllCoaches(query).subscribe({
      
      next: (data: PaginatedResult<CoachDto>) => {
        this.coaches = data.items;
        this.totalItemsCount = data.totalItemsCount;
        this.totalPages = data.totalPages;
        this.itemsFrom = data.itemsFrom;
        this.itemsTo = data.itemsTo;
        this.hasNextPage = data.hasNextPage;
        this.hasPreviousPage = data.hasPreviousPage;
        this.currentPage = query.pageNumber; // Update current page
      },
      error: (err) => {
        console.error('Error fetching coaches', err);
      }
    });
  
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.getAllCoaches({ pageNumber });
    }
  }
}
