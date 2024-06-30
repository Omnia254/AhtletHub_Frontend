import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/ApIServices/auth.service';
import { TokenService } from '../../services/ApIServices/token.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private tokenService:TokenService
  ) {

  }

  ngOnInit(): void {
     this.authService.checkLoginStatus();
     this.authService.isLoggedIn.subscribe((status:boolean)=>{
       this.isLoggedIn = status;
     })

  }
}
