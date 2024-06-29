export interface ResetPasswordCommand {
    email: string;
    clientResetPasswordUrl: string;
  }
  
  export interface ConfirmResetPasswordCommand {
    token: string;
    email: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  export interface ResetPasswordResponseDto {
    userEmailToConfirm: string;
    passwordResetLink: string;
  }
