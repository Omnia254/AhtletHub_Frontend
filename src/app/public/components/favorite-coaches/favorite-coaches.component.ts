import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteCoachService } from '../../services/favorite-coach.service';
import { Coach } from '../../interfaces';

@Component({
  selector: 'app-favorite-coaches',
  templateUrl: './favorite-coaches.component.html',
  styleUrls: ['./favorite-coaches.component.scss']
})
export class FavoriteCoachesComponent implements OnInit {
  favoriteCoaches: Coach[] = [];

  constructor(
    private router: Router,
    private favoriteCoachService: FavoriteCoachService
  ) { }

  ngOnInit(): void {
    this.favoriteCoaches = this.favoriteCoachService.getFavorites();
  }

  viewDetails(coachId: number): void {
    this.router.navigate(['/fav', coachId]);
  }
}
