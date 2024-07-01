import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateSubscribtionCommand } from '../../Interfaces/coach/CreateSubscribtionCommand';
import { Observable } from 'rxjs';
import { PageResults, SortingDirection, Subscription } from '../../Interfaces/coach/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribtionService implements OnInit{
  private apiUrl = `${environment.baseUrl}`;
 coach?:number|0;
  constructor(private http: HttpClient ,
    private tokenService: TokenService,
    private route:ActivatedRoute,
  ) {

    this.fetchEntityId();
  }

  ngOnInit(): void {
    this.coach = +this.route.snapshot.paramMap.get('coachId')!;
}

  fetchEntityId() {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.coach = entityId;
      console.log(this.coach );

    } else {
      // Handle case where entityId is null
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }


  addSubscribtion(command: CreateSubscribtionCommand): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}subscribtions`, command);
  }
  getSubscriptions(
   // include:boolean,
    coachId: number,
    pageNumber: number,
    pageSize: number,
    sortBy?: string,
    sortingDirection: SortingDirection = SortingDirection.Ascending
  ): Observable<PageResults<Subscription>> {
    let params = new HttpParams()
      .set('Includes', true)
      .set('PageSize', coachId)
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);
    //  .set('SortingDirection', sortingDirection);

    // if (sortBy) {
    //   params = params.set('SortBy', sortBy);
    // }
 
    const sortingValue = sortingDirection === SortingDirection.Ascending ? '1' : '0';
    params = params.set('SortingDirection', sortingValue);
    return this.http.get<PageResults<Subscription>>(`${this.apiUrl}coaches/${this.coach}/subscribtions`, { params });
  }

  getAthleteSubscriptions(includeSubscriptionFeature: boolean, sortByCriteria: string, sortingDirection: string): Observable<Subscription[]> {
    const params = {
      includeSubscribtionFeature: includeSubscriptionFeature.toString(),
      sortByCritrea: sortByCriteria,
      sortingDirection: sortingDirection
    };

    return this.http.get<Subscription[]>(`${this.apiUrl}AthleteSubscribtion`, { params })
      .pipe(
      );
  }

}
