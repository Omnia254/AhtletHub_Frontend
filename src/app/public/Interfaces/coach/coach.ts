// coach.model.ts

export interface CoachDto {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;  // Adjust as per your enum mapping
  dateOfBirth: string; // Adjust the type if needed
  sasProfilePicture?: string;
  sasCertificate?: string;
  bio?: string;
  ratingsCount?: number;
  overallRating?: number;
  subscriptions: SubscriptionDto[]; // Make sure this is correctly defined
  coachesRatings: CoachRatingDto[];
}

  export interface SubscriptionDto {
    id: number;
    coachId: number;
    name: string;
    price: number;
    durationInMonths: number;
    subscriptionsFeatures: SubscriptionFeatureDto[];
  }
  
  export interface SubscriptionFeatureDto {
    subscriptionId: number;
    featureId: number;
    name: string;
    description: string;
  }
  
  export interface CoachRatingDto {
    athleteId: number;
    coachId: number;
    athleteFirstName: string;
    athleteLastName: string;
    athleteProfilePicture?: string;
    rate: number;
    comment: string;
  }
  
  export interface PageResultsDto<T> {
    items: T[];
    totalItemsCount: number;
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
  