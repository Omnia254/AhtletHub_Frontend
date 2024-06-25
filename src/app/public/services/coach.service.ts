import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'your-api-url-here';

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<{ items: Coach[] }> {
    return this.http.get<{ items: Coach[] }>(this.apiUrl);
  }

  getCoach(coachId: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${coachId}`);
  }
}
