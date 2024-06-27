// token.service.ts
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  extractEntityIdFromToken(): number | null {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token not found in local storage');
      return null;
    }

    try {
      const decoded: any = jwtDecode(accessToken);

      // Access custom claim 'EntityId' directly from decoded token
      const entityId = Number(decoded.EntityId);

      if (!entityId) {
        console.error('EntityId not found in token claims');
        return null;
      }

      return entityId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
