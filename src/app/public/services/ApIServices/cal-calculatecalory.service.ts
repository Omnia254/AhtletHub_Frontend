import { environment } from 'src/environments/environment';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalCalculatecaloryCommand } from 'src/app/public/Interfaces/Athlete/cal-calculatecalory.interface';

@Injectable({
  providedIn: 'root'
})
export class CalCalculatecaloryService {
  private apiUrl = `${environment.baseUrl}`;// Replace with your API URL

  constructor(private http: HttpClient) { }

  calculateCalories(command: CalCalculatecaloryCommand): Observable<number> {
    console.log('Sending request with payload:', command); // Log the request details

    return this.http.post<number>(`${this.apiUrl}CalCalculatecalory`, command);

  }
}

