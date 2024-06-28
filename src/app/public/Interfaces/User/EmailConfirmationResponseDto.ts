export interface EmailConfirmationResponseDto {
    userEmailToConfirm: string;
    emailConfirmationLink: string;
    roles: string[];
    entityId:number;

  }
  