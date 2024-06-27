export interface UserDto {
    id: string;
    entityId: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth: string; // Use ISO string format
    bio?: string;
    height?: number;
    roles?: string[];
  }
  
  export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }