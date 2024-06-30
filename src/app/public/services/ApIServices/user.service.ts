import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust path as per your actual structure
import { UpdatedUserDto } from '../../Interfaces/User/UpdatedUserDto'; // Adjust path as per your actual structure
import { UserDto } from '../../Interfaces/User/UserDto';
import { ActivateDeactivateUser } from '../../Interfaces/User/ActivateDeactivateUser';
import { ChangePasswordRequest } from '../../Interfaces/User/ChangePasswordRequest';
import { EmailConfirmationResponseDto } from '../../Interfaces/User/EmailConfirmationResponseDto';
import { CustomEncoder } from '../../custom-encoder';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

 // getCurrentUser(): Observable<UpdatedUserDto> {
   // return this.http.get<UpdatedUserDto>(`${this.apiUrl}getCurrentUser`);
  //}

  updateUser(updateUserCommand: UpdatedUserDto): Observable<UpdatedUserDto> {
    return this.http.patch<UpdatedUserDto>(`${this.apiUrl}Identity/updateUser`, updateUserCommand);
  }
  getUserById(id: string): Observable<UserDto> {
   // const url = `${this.apiUrl}getUserById/${id}`;
   // return this.http.get<UserDto>(url);
    return this.http.get<UserDto>(`${this.apiUrl}Identity/getUserById/${id}`);
  }

  activateOrDeactivateUser(command: ActivateDeactivateUser): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}Identity/deactivateUser`, command, { withCredentials: true });
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}Identity/changePassword`, request, { withCredentials:true });
  }

  changeEmail(currentEmail: string, newEmail: string, confirmNewEmail: string, clientEmailChangingConfirmationUrl: string): Observable<EmailConfirmationResponseDto> {
    const body = {
      currentEmail,
      newEmail,
      confirmNewEmail,
      clientEmailChangingConfirmationUrl
    };
  
    return this.http.patch<EmailConfirmationResponseDto>(`${this.apiUrl}Identity/changeEmail`, body);
  }
  

  //  changeEmail(currentEmail: string, newEmail: string, confirmNewEmail: string, clientEmailChangingConfirmationUrl: string): Observable<EmailConfirmationResponseDto> {
  //    const body = {
  //      currentEmail,
  //      newEmail,
  //      confirmNewEmail,
  //      clientEmailChangingConfirmationUrl
  //    };
  //    console.log(body);
     
  //    return this.http.patch<EmailConfirmationResponseDto>(`${this.apiUrl}Identity/changeEmail`, {body},{withCredentials:true});
  //  }
  // changeEmail(currentEmail: string, newEmail: string, confirmNewEmail: string, clientEmailChangingConfirmationUrl: string): Observable<EmailConfirmationResponseDto> {
  //   const url = `${this.apiUrl}Identity/changeEmail`;
  //   const queryParams = `?currentEmail=${currentEmail}&newEmail=${newEmail}&confirmNewEmail=${confirmNewEmail}&clientEmailChangingConfirmationUrl=${encodeURIComponent(clientEmailChangingConfirmationUrl)}`;
    
  //   return this.http.get<EmailConfirmationResponseDto>(url + queryParams);
  // }

  // changeEmail(currentEmail: string, newEmail: string, confirmNewEmail: string, clientEmailChangingConfirmationUrl: string): Observable<EmailConfirmationResponseDto> {
  //   const url = `${this.apiUrl}Identity/changeEmail`;
  //   const params = new HttpParams()
  //     .set('currentEmail', currentEmail)
  //     .set('newEmail', newEmail)
  //     .set('confirmNewEmail', confirmNewEmail)
  //     .set('clientEmailChangingConfirmationUrl', '');

  //   return this.http.get<EmailConfirmationResponseDto>(url, { params });
  // }
  confirmChangeEmail(useroldemail:string ,email: string, token: string): Observable<any> {
    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('useroldemail',useroldemail);
    params = params.append('useremailtoconfirm', email);
    params = params.append('token', token);
    console.log(params);
    return this.http.get<any>(`${this.apiUrl}Identity/confirmChangeEmail`, {params});
  }
  
  // confirmEmail(token: string, email: string): Observable<any> {
  //   let params = new HttpParams({ encoder: new CustomEncoder() });
  //   params = params.append('useremailtoconfirm', email);
  //   params = params.append('token', token);
  //   return this.http.get<any>(`${this.apiUrl}Identity/confirmemail`, { params });
  // }

}
