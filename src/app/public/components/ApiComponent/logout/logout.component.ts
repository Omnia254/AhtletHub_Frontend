import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/public/services/ApIServices/account.service';
import { AuthService } from 'src/app/public/services/ApIServices/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout()
  {
    this.accountService.revokeToken().subscribe({
      next: res => {
          if(res){
            console.log(res.isRevoked);
            this.authService.loggingOut();
            this.removeToken();
            this.router.navigate(['../../home']);
          }
      }
    });
  }

  removeToken()
  {
    localStorage.clear();
  }

}
