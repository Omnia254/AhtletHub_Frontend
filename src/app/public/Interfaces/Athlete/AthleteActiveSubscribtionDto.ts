//return
export interface AthleteActiveSubscribtionDto {
    athleteId: number;
    subscribtionId: number;
    subscribtionStartDate?: string; // Date string in ISO format
    subscribtionEndDate?: string;   // Date string in ISO format
    canSubscribe: boolean;
  }