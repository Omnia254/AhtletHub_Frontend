export interface RegisterUserCommand {
    email: string;
    confirmEmail: string;
    userName: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth: string; // Use ISO string format
    height?: number;
    bio?: string;
    isCoach: boolean;
    certificate?: File;
  }
  export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }