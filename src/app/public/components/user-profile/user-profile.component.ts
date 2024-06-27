// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss']
// })
// export class UserProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   selectedFile: File | null = null;

//   constructor(private fb: FormBuilder, private userService: UserService) {
//     this.profileForm = this.fb.group({
//       username: [''],
//       firstName: [''],
//       lastName: [''],
//       gender: [0],
//       dateOfBirth: [''],
//       profilePicture: [null],
//       bio: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.userService.getUserProfile().subscribe(data => {
//       this.profileForm.patchValue(data);
//     });
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//     }
//   }

//   onSubmit(): void {
//     const formData: any = new FormData();
//     formData.append('username', this.profileForm.get('username')?.value);
//     formData.append('firstName', this.profileForm.get('firstName')?.value);
//     formData.append('lastName', this.profileForm.get('lastName')?.value);
//     formData.append('gender', this.profileForm.get('gender')?.value);
//     formData.append('dateOfBirth', this.profileForm.get('dateOfBirth')?.value);
//     formData.append('bio', this.profileForm.get('bio')?.value);

//     if (this.selectedFile) {
//       formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
//     }

//     this.userService.updateUserProfile(formData).subscribe(response => {
//       console.log('Profile updated successfully', response);
//     });
//   }
// }
