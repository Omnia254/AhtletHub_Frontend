//get  from front
export interface SubscribeCommand {
    athleteId: number;
    coachId: number;
    subscribtionId: number;
    subscribtionDurationInMonth: number;
    subscribtionPrice: number;
    subscribtionName: string;
  }

  export interface SubscribeCommandforAthlete {
    sessionId:string;
  }