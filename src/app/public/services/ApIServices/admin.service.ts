import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SiteInfoDto } from '../../Interfaces/admin/SiteInfoDto';
import { ApprovalResponseDto } from '../../Interfaces/admin/ApprovalResponseDto';
import { CoachDto, PageResultsDto } from '../../Interfaces/coach/coach';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getSiteInfo(): Observable<SiteInfoDto> {
    return this.http.get<SiteInfoDto>(`${this.apiUrl}SiteInfo`);
  }

  approveCoach(coachId: number): Observable<ApprovalResponseDto> {
    return this.http.patch<ApprovalResponseDto>(`${this.apiUrl}ApproveCoach/${coachId}`, {});
  }
  getNotApprovedCoaches(pageNumber: number, pageSize: number): Observable<PageResultsDto<CoachDto>> {
    return this.http.get<PageResultsDto<CoachDto>>(`${this.apiUrl}NotApprovedCoaches/${pageNumber}/${pageSize}`);
  }
}
