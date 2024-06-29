// updated-user.dto.ts
export interface UpdatedUserDto {
    userName?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: Gender; // Adjust as per your enums or types
    dateOfBirth?: string; // Use Date or another appropriate type
    bio?: string;
  }
  

  // Gender enum
  export enum Gender {
    Male = 0,
    Female = 1
  }
  