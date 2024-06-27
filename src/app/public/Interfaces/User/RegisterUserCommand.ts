export interface RegisterUserCommand {
  email: string;
  confirmEmail: string;
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: number; // Assuming gender is represented as a number in the backend
  dateOfBirth: string; // Use string or Date type as per your application needs
  height?: number;
  bio?: string | null;
  isCoach: boolean;
  certificate?: File;
  clientEmailConfirmationUrl: string;
}

export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }