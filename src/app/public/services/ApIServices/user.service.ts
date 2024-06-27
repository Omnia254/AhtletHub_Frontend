import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust path as per your actual structure
import { UpdatedUserDto } from '../../Interfaces/User/UpdatedUserDto'; // Adjust path as per your actual structure
import { UserDto } from '../../Interfaces/User/UserDto';

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
}
