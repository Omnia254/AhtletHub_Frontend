// // user-profile.component.ts (No changes needed for TypeScript)
// import { Component, OnInit } from '@angular/core';
// import { UpdatedUserDto } from 'src/app/public/Interfaces/User/UpdatedUserDto';
// import { UserService } from 'src/app/public/services/ApIServices/user.service';
//  // Adjust path as per your actual structure
//  import { FormsModule } from '@angular/forms';
// import { UserDto } from 'src/app/public/Interfaces/User/UserDto';
//  @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
  
// })
// export class UserProfileComponent implements OnInit {

//   userId: string = 'user-id-to-fetch'; // Replace with an actual user ID
//   user1: UserDto | null = null;

//   user: UpdatedUserDto = {
//     userName: '',
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     gender: '',
//     dateOfBirth: '',
//     bio: ''
//   };

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     // this.userService.getUserById().subscribe({
//     //   next: (user: UpdatedUserDto) => {
//     //     this.user = user;
//     //   },
//     //   error: (error: any) => {
//     //     console.error('Error fetching user:', error);
//     //   }
//     // });
//   }

//   onSubmit(): void {
//     this.userService.updateUser(this.user).subscribe({
//       next: (updatedUser: UpdatedUserDto) => {
//         // Handle success or show message
//         console.log('User updated successfully:', updatedUser);
//       },
//       error: (error: any) => {
//         // Handle error
//         console.error('Error updating user:', error);
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Gender, UpdatedUserDto } from 'src/app/public/Interfaces/User/UpdatedUserDto';
import { UserService } from 'src/app/public/services/ApIServices/user.service';
import { UserDto } from 'src/app/public/Interfaces/User/UserDto';
import {   jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  athleteId: string = ''; // Adjust to match your ID type
  accessToken: string = '';
  user: UpdatedUserDto = {
    userName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: Gender.Male ,
    dateOfBirth: '',
    bio: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.accessToken = this.getAccessTokenFromLocalStorage();
    if (this.accessToken) {
      this.athleteId = this.getIdFromToken(this.accessToken);
      this.getUserById(this.athleteId);
    }
  }

  private getAccessTokenFromLocalStorage(): string {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.accessToken;
    } else {
      console.log("User not found in local storage");
      return '';
    }
  }

  private getIdFromToken(token: string): string {
    try {
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } catch (error) {
      console.error('Failed to decode token', error);
      return '';
    }
  }

  private getUserById(id: string): void {
 
    this.userService.getUserById(id).subscribe({
      next: (user: UserDto) => {
        console.log('User fetched successfully:', user);
        this.user.userName = user.userName;
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.phoneNumber = user.phoneNumber;
        if(user.gender == "Female")
        {
          this.user.gender = 1;
        }
        else
        {
          
            this.user.gender = 0;
          
        }
        // this.user.gender = user.gender;
        this.user.dateOfBirth = user.dateOfBirth;
        this.user.bio = user.bio;
      },
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  onSubmit(): void {

    const commandToSend = {
      ...this.user,
      gender: Gender[this.user.gender as unknown as keyof typeof Gender] // Convert enum to number
    };
    this.userService.updateUser(commandToSend).subscribe({
      next: (updatedUser: UpdatedUserDto) => {
        console.log('User updated successfully:', updatedUser);
        this.user = updatedUser; // Update local user object with updated data
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
      }
    });
  }
  
  genderKeys(): string[] {
    return Object.keys(Gender).filter(k => isNaN(Number(k)));
  }

}
