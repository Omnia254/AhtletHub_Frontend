// feature.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureDto } from '../../Interfaces/coach/FeatureDto';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getAllFeatures(): Observable<FeatureDto[]> {
    return this.http.get<FeatureDto[]>(`${this.apiUrl}features`);
  }
}
