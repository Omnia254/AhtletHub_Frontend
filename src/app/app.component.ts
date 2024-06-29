import { Component, Input } from '@angular/core';
import { AuthService } from './public/services/auth-service/auth.service';
import { IsCoachService } from './public/services/ApIServices/is-coach.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-and-register-example';
  constructor(public isCoachService: IsCoachService) {}

}
