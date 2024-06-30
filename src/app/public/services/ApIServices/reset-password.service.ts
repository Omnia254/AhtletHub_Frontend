import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResetPasswordResponseDto } from '../../Interfaces/User/reset-password';
import { CustomEncoder } from '../../custom-encoder';
 
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) { }
  
  initiateReset(email: string, clientResetPasswordUrl: string): Observable<ResetPasswordResponseDto> {
    let params = new HttpParams()
      .set('email', email)
      .set('clientResetPasswordUrl', clientResetPasswordUrl);


    return this.http.get<ResetPasswordResponseDto>(`${this.apiUrl}Identity/resetPassword`, { params: params });
  }

  confirmReset(token: string, email: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    // let params = new HttpParams()
    //   .set('token', token)
    //   .set('email', email)
    //   .set('newPassword', newPassword)
    //   .set('confirmNewPassword', confirmNewPassword);

    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('token',token);
    params = params.append('email', email);
    params = params.append('newPassword', newPassword);
    params = params.append('confirmNewPassword', confirmNewPassword);


    return this.http.get<any>(`${this.apiUrl}Identity/confirmresetPassword`, { params });
  }
}