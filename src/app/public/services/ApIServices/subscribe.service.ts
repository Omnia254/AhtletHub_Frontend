// subscribe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscribeCommand } from './../../Interfaces/Athlete/SubscribeCommand';
import { AthleteActiveSubscribtionDto } from './../../Interfaces/Athlete/AthleteActiveSubscribtionDto';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = `${environment.baseUrl}Subscribe`;

  constructor(private http: HttpClient) { }

  subscribe(subscribeCommand: SubscribeCommand): Observable<AthleteActiveSubscribtionDto> {
    return this.http.post<AthleteActiveSubscribtionDto>(this.apiUrl, subscribeCommand);
  }
}
