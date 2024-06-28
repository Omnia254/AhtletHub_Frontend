
// src/app/services/coach.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileSasUrlDto } from '../../Interfaces/User/FileSasUrlDto';

@Injectable({
  providedIn: 'root',
})
export class UploadingService {
  private apiUrl = `${environment.baseUrl}`;


  constructor(private http: HttpClient) {}

  uploadCertificate(coachId: number, file: File): Observable<FileSasUrlDto > {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post<FileSasUrlDto>(`${this.apiUrl}coaches/${coachId}/certificate`, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    return throwError('An error occurred while uploading the certificate.');
  }
}
