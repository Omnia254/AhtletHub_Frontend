import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/user';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    // Mock data, replace with actual API call
    const mockData = {
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      gender: 0,
      dateOfBirth: '1990-01-01',
      profilePicture: null,
      bio: 'This is a mock bio'
    };
    return of(mockData);
  }

  updateUserProfile(data: FormData): Observable<any> {
    // Replace with actual API call
    return this.http.put(`${this.apiUrl}/profile`, data);
  }
}
