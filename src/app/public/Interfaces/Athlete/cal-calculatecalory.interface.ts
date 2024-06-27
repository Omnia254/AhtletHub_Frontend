// cal-calculatecalory.interface.ts
export interface CalCalculatecaloryCommand {
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    dailyActivityRate: DailyActivityRate;
  }
  
  
  // Gender enum
export enum Gender {
    Male = 0,
    Female = 1
  }
  
  // DailyActivityRate enum
  export enum DailyActivityRate {
    Sedentary = 0,
    LightlyActive = 1,
    ModeratelyActive = 2,
    VeryActive = 3,
    SuperActive = 4
  }
  