// subscribe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscribeCommand, SubscribeCommandforAthlete } from './../../Interfaces/Athlete/SubscribeCommand';
import { AthleteActiveSubscribtionDto, AthleteActiveSubscribtionDtos } from './../../Interfaces/Athlete/AthleteActiveSubscribtionDto';
import { CheckSubscribeResponseDto } from '../../Interfaces/Athlete/CheckSubscribeResponseDto';
import { TokenService } from './token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = `${environment.baseUrl}`;
  private athlete: number | undefined;


  constructor(private http: HttpClient ,
    private tokenService: TokenService,
    private route:ActivatedRoute,
    private router:Router,
  ) {

    this.fetchEntityId();
  }

  ngOnInit(): void {
    this.athlete = +this.route.snapshot.paramMap.get('athleteId')!;
}

  fetchEntityId() {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.athlete = entityId;
      console.log(this.athlete );

    } else {
      // Handle case where entityId is null
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }
  subscribe(subscribeCommand: SubscribeCommand): Observable<AthleteActiveSubscribtionDto> {
    return this.http.post<AthleteActiveSubscribtionDto>(`${this.apiUrl}Subscribe`, subscribeCommand);
  }


  subscribeAndPayement(subscribeCommand: SubscribeCommandforAthlete): Observable<AthleteActiveSubscribtionDtos> {
    return this.http.post<AthleteActiveSubscribtionDtos>(`${this.apiUrl}Subscribe`, subscribeCommand);
  }
  checkSubscribeAbility(coachId: number, subscriptionId: number): Observable<CheckSubscribeResponseDto> {
     console.log(coachId,subscriptionId)
    return this.http.get<CheckSubscribeResponseDto>(`${this.apiUrl}CheckSubscribeAblity`, {
      params: {
        coachId: coachId.toString(),
        subscriptionId: subscriptionId.toString(),
      },
    });
  }

  createCheckoutSession(price: number, subscriptionName: string, athleteId: number|undefined, subscriptionId: number): Observable<{ sessionUrl: string }> {
    athleteId =this.athlete;
    const request = {
      price,
      subscriptionName,
      athleteId,
      subscriptionId
    };
    return this.http.post<{ sessionUrl: string }>(`${this.apiUrl}Payment/create-checkout-session`, request);
  }
}
