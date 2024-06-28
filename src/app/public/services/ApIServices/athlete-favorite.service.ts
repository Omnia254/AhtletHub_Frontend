import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AthleteFavouriteCoachDto } from '../../Interfaces/Athlete/AthleteFavouriteCoachDto';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AthleteFavoriteService {
  athleteId: number = 0;

  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient,private tokenService:TokenService) {
    this.fetchEntityId();

  }

  // private getAthleteIdFromLocalStorage(): number {
  //   const athleteIdString = localStorage.getItem('athleteId');
  //   //athleteId: this.athleteId,
  //   return athleteIdString ? +athleteIdString : 0; // Assuming athleteId is stored as a number
  // }

  addToFavorite(coachId: number): Observable<AthleteFavouriteCoachDto> {
    //const athleteId = this.getAthleteIdFromLocalStorage();
    const athleteId = this.athleteId;

    const body = { athleteId, coachId };
    return this.http.post<AthleteFavouriteCoachDto>(`${this.apiUrl}AddToFavorite`, body);
  }

  fetchEntityId() {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.athleteId = entityId;
      console.log(this.athleteId );

    } else {
      // Handle case where entityId is null
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }
}

