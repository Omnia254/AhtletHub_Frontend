// src/app/components/activate-deactivate-user/activate-deactivate-user.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivateDeactivateUser } from 'src/app/public/Interfaces/User/ActivateDeactivateUser';
import { UserService } from 'src/app/public/services/ApIServices/user.service';

@Component({
  selector: 'app-activate-deactivate-user',
  templateUrl: './activate-deactivate-user.component.html',
  styleUrls: ['./activate-deactivate-user.component.scss']
})
export class ActivateDeactivateUserComponent {

  constructor(private userService: UserService,private router: Router) {}

  toggleUserActivation() {
  
    
    const command: ActivateDeactivateUser={};

    this.userService.activateOrDeactivateUser(command).subscribe({
      next: () => {
        this.router.navigate(['../logout']);
      },
      error: (err) => {
        console.error('Error changing user activation status:', err);
      }
    });
  }
}
