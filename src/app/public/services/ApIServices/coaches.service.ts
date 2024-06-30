import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoachDto, PaginatedResult, SearchCriteria } from '../../interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private apiUrl = 'http://localhost:5068/api/'; // Replace with your actual API URL
 
  constructor(private http: HttpClient) {}

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
}
