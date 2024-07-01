import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/public/services/ApIServices/auth.service';

@Component({
  selector: 'app-coachnavbar',
  templateUrl: './coachnavbar.component.html',
  styleUrls: ['./coachnavbar.component.scss']
})
export class CoachnavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkLoginStatus();
    this.authService.isLoggedIn.subscribe((status:boolean)=>{
      this.isLoggedIn = status;
    })
  }
}
