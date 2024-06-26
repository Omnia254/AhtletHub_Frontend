import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdatedUserDto } from 'src/app/public/Interfaces/User/UpdatedUserDto';
import { UserService } from 'src/app/public/services/ApIServices/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.updateForm = this.formBuilder.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      gender: [''],
      dateOfBirth: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.updateForm.patchValue(user);
    }, error => {
      console.error('Error fetching user:', error);
    });
  }

  onSubmit(): void {
    const updateUserCommand = this.updateForm.value as UpdatedUserDto;
    this.userService.updateUser(updateUserCommand).subscribe(updatedUser => {
      // Handle success or show message
      console.log('User updated successfully:', updatedUser);
    }, error => {
      // Handle error
      console.error('Error updating user:', error);
    });
  }
}
