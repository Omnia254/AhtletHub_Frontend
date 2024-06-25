import { Injectable } from '@angular/core';
import { Coach } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCoachService {
  private favoriteCoaches: Coach[] = [];

  getFavorites(): Coach[] {
    return this.favoriteCoaches;
  }

  addFavorite(coach: Coach): void {
    this.favoriteCoaches.push(coach);
  }

  removeFavorite(coachId: number): void {
    this.favoriteCoaches = this.favoriteCoaches.filter(coach => coach.id !== coachId);
  }

  toggleFavorite(coach: Coach): void {
    const index = this.favoriteCoaches.findIndex(c => c.id === coach.id);
    if (index > -1) {
      this.favoriteCoaches.splice(index, 1);
    } else {
      this.favoriteCoaches.push(coach);
    }
  }
}
