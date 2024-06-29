import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsCoachService {

  private _isCoach = false;

  get isCoach(): boolean {
    return this._isCoach;
  }

  set isCoach(value: boolean) {
    this._isCoach = value;
  }
}
