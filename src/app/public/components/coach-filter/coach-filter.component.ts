import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-coach-filter',
  templateUrl: './coach-filter.component.html',
  styleUrls: ['./coach-filter.component.scss']
})
export class CoachFilterComponent {
  @Output() filterChange = new EventEmitter<any>();

  ageFilter: string = '';
  ratingFilter: string = '';
  genderFilter: string = '';
  sortBy: string = '';
  sortOrder: string = 'asc';

  onFilterChange(): void {
    const filters = {
      age: this.ageFilter,
      rating: this.ratingFilter,
      gender: this.genderFilter,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder
    };
    this.filterChange.emit(filters);
  }
}
