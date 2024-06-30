import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeasurementDto } from "src/app/public/Interfaces/Athlete/MeasurementDto";
import { TokenService } from "src/app/public/services/ApIServices/token.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private athleteId: number = 0; // Initialize with a default value

  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.fetchEntityId(); // Call fetchEntityId() in the constructor
  }

  getAthleteId(): number {
    return this.athleteId;
  }

  // Function to format date as 'yyyy-MM-dd'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMeasurementByAthleteId(athleteId: number, date: Date): Observable<MeasurementDto> {
    const params = new HttpParams()
      .set('AthleteId', athleteId.toString())
      .set('date', this.formatDate(date));

    console.log(`Requesting measurement for athleteId: ${athleteId} on date: ${this.formatDate(date)}`);
    return this.http.get<MeasurementDto>(`${this.apiUrl}Athlete/${athleteId}/Measurement`, { params });
  }

  addMeasurement(athleteId: number, measurementData: MeasurementDto): Observable<MeasurementDto> {
    return this.http.post<MeasurementDto>(`${this.apiUrl}Athlete/${athleteId}/Measurement`, measurementData);
  }

  fetchEntityId(): void {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.athleteId = entityId;
      console.log('Fetched Athlete ID:', this.athleteId);
    } else {
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }

  deleteMeasurement(date: Date): Observable<void> {
    const formattedDate = this.formatDate(date);
    const params = new HttpParams().set('date', formattedDate);
    return this.http.delete<void>(`${this.apiUrl}Athlete/Measurement`, { params });
  }
}
