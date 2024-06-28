import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/public/services/ApIServices/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  log()
  {

    this.accountService.revokeToken().subscribe({

      next: res => {
          if(res == true){
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
