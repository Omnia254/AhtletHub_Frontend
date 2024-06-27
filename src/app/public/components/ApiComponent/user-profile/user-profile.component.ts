// user-profile.component.ts (No changes needed for TypeScript)
import { Component, OnInit } from '@angular/core';
import { UpdatedUserDto } from 'src/app/public/Interfaces/User/UpdatedUserDto';
import { UserService } from 'src/app/public/services/ApIServices/user.service';
 // Adjust path as per your actual structure
 import { FormsModule } from '@angular/forms';
 @Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  
})
export class UserProfileComponent implements OnInit {
  user: UpdatedUserDto = {
    userName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    bio: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: UpdatedUserDto) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (updatedUser: UpdatedUserDto) => {
        // Handle success or show message
        console.log('User updated successfully:', updatedUser);
      },
      error: (error: any) => {
        // Handle error
        console.error('Error updating user:', error);
      }
    });
  }
}
