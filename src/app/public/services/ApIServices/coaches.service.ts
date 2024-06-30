import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoachDto, PaginatedResult, SearchCriteria } from '../../interfaces';
import { Observable } from 'rxjs';
import { PageResultsDto } from '../../Interfaces/coach/coach';
import { TokenService } from './token.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private apiUrl = 'http://localhost:5068/api/'; // Replace with your actual API URL
 
  private athlete: number | undefined;

  constructor(private http: HttpClient ,
    private tokenService: TokenService,
    private route:ActivatedRoute,
    private router:Router,
  ) {

    this.fetchEntityId();
  }

  ngOnInit(): void {
    this.athlete = +this.route.snapshot.paramMap.get('coachId')!;
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
  getAllCoaches(query: any): Observable<PaginatedResult<CoachDto>> {
    let params = new HttpParams();
    for (const key in query) {
      if (query.hasOwnProperty(key) && query[key] !== undefined && query[key] !== '') {
        params = params.set(key, query[key]);
      }
    }
    
    return this.http.get<PaginatedResult<CoachDto>>(`${this.apiUrl}coaches`, { params });
    
  }
  getCoachById(id: number): Observable<CoachDto> {
    return this.http.get<CoachDto>(`${this.apiUrl}coaches/${id}`);
  }

  getFavoriteCoaches(
    athleteId: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    sortingDirection: 'Ascending' | 'Descending' = 'Ascending'
  ): Observable<PaginatedResult<CoachDto>> {
    // const params = new HttpParams()
    //   .set('AthleteId', String(this.coach))
    //   .set('PageNumber', pageNumber.toString())
    //   .set('PageSize', pageSize.toString())
    //   .set('SortingDirection', sortingDirection);
    if (this.athlete === undefined) {
      this.router.navigate(['../public/login']);
    }

    const params = new HttpParams()
      .set('AthleteId', String(this.athlete))
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('SortingDirection', sortingDirection);

    return this.http.get<PaginatedResult<CoachDto>>(`${this.apiUrl}FavCoaches`, { params });
  }
}
