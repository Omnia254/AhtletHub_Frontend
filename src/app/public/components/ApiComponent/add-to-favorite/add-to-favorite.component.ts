// import { Component } from '@angular/core';
// import { AthleteFavouriteCoachDto } from 'src/app/public/Interfaces/Athlete/AthleteFavouriteCoachDto';
// import { AthleteFavoriteService } from 'src/app/public/services/ApIServices/athlete-favorite.service';

// @Component({
//   selector: 'app-add-to-favorite',
//   templateUrl: './add-to-favorite.component.html',
// })
// export class AddToFavoriteComponent {
//   athleteId: number = 0;
//   coachId: number = 0;
//   result: AthleteFavouriteCoachDto | null = null;
  // errorMessage: string | null = null;

//   constructor(private athleteFavoriteService: AthleteFavoriteService ) {}

//   addToFavorite() {
//     this.athleteFavoriteService.addToFavorite(this.athleteId, this.coachId).subscribe({
//       next: (data) => {
//         this.result = data;
//         this.errorMessage = null;
//       },
//       error: (err) => {
//         this.result = null;
//         this.errorMessage = 'Failed to add to favorite';
//       }
//     });
//   }
// }
