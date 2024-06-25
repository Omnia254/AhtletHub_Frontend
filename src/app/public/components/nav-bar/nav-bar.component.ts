import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  

 // logout() {
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
   // localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    //this.router.navigate(['../../login']);
  //}

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => this.isLoggedIn = status);
  }

  logout(): void {
    this.authService.logout();
  }
}
