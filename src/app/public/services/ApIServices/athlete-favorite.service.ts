import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AthleteFavouriteCoachDto } from '../../Interfaces/Athlete/AthleteFavouriteCoachDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthleteFavoriteService {
  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  private getAthleteIdFromLocalStorage(): number {
    const athleteIdString = localStorage.getItem('athleteId');
    return athleteIdString ? +athleteIdString : 0; // Assuming athleteId is stored as a number
  }

  addToFavorite(coachId: number): Observable<AthleteFavouriteCoachDto> {
    const athleteId = this.getAthleteIdFromLocalStorage();
    const body = { athleteId, coachId };
    return this.http.post<AthleteFavouriteCoachDto>(`${this.apiUrl}AddToFavorite`, body);
  }
}