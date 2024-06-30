import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/ApIServices/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((status:boolean)=>{
      this.isLoggedIn = status;
    })
  }
}
