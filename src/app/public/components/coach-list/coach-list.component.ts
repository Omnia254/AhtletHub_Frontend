import { Component, OnInit } from '@angular/core';
import { CoachService } from './../../services/coach.service';
import { Coach } from '../../interfaces';
import { Router } from '@angular/router';
import { FavoriteCoachService } from '../../services/favorite-coach.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [];
  filteredCoaches: Coach[] = [];

  constructor(
    private router: Router,
    private coachService: CoachService,
    private favoriteCoachService: FavoriteCoachService
  ) { }

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe(data => {
      this.coaches = data.items;
      this.filteredCoaches = this.coaches;
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCoaches = this.coaches.filter(coach =>
      coach.firstName.toLowerCase().includes(searchTerm) ||
      coach.lastName.toLowerCase().includes(searchTerm)
    );
  }

  filterCoaches(filters: any): void {
    this.filteredCoaches = this.coaches.filter(coach => {
      const age = this.calculateAge(coach.dateOfBirth);

      // Apply age filter
      if (filters.age) {
        if (filters.age === 'lessThan20' && age >= 20) return false;
        if (filters.age === 'between20and25' && (age < 20 || age > 25)) return false;
        if (filters.age === 'between25and30' && (age < 25 || age > 30)) return false;
        if (filters.age === 'moreThan30' && age <= 30) return false;
      }

      // Apply rating filter
      if (filters.rating) {
        if (filters.rating === 'moreThanOne' && coach.overallRating <= 1) return false;
        if (filters.rating === 'moreThanTwo' && coach.overallRating <= 2) return false;
        if (filters.rating === 'moreThanThree' && coach.overallRating <= 3) return false;
        if (filters.rating === 'moreThanFour' && coach.overallRating <= 4) return false;
      }

      // Apply gender filter
      if (filters.gender !== undefined && filters.gender !== null) {
        if (coach.gender !== +filters.gender) return false;
      }

      return true;
    });

    // Apply sorting
    if (filters.sortBy) {
      this.filteredCoaches.sort((a, b) => {
        if (filters.sortBy === 'rate') {
          return filters.sortOrder === 'asc' ? a.overallRating - b.overallRating : b.overallRating - a.overallRating;
        }
        if (filters.sortBy === 'price') {
          const priceA = Math.min(...a.subscribtions.map(s => s.price));
          const priceB = Math.min(...b.subscribtions.map(s => s.price));
          return filters.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        }
        return 0;
      });
    }
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  viewDetails(coachId: number): void {
    this.router.navigate(['/coach', coachId]);
  }

  toggleFavorite(coach: Coach): void {
    this.favoriteCoachService.toggleFavorite(coach);
    coach.isFavorite = !coach.isFavorite;
  }
}
