// src/app/models/user-login-response.dto.ts

export interface UserLoginResponseDto {
    isValidCredentials: boolean;
    isActive: boolean;
    isApproved: boolean;
    isLockedOut: boolean;
    lockoutEnd?: Date;
    userNameOrEmail: string;
    roles?: string[];
    accessToken?: string;
    accessTokenExpiration?: Date;
    refreshToken?: string;
    refreshTokenExpiration: Date;
  }
  
  