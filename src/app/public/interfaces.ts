
/*
Interface for the Refresh Token (can look different, based on your backend api)
*/
export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Login Response (can look different, based on your backend api)
*/
export interface LoginResponse {
  accessToken: string;
  refreshToken: RefreshToken;
  tokenType: string;
}

export interface LoginInput{
  userNameOrEmail:string;
  password: string;

}
/*
Interface for the Login Request (can look different, based on your backend api)
*/
export interface LoginRequest {
  email: string;
  password: string;
}

/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface RegisterRequest {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

/*
Interface for the Register Response (can look different, based on your backend api)
*/
export interface RegisterResponse {
  status: number;
  message: string;
}

export interface SubscriptionFeature {
  subscribtionId: number;
  featureId: number;
  name: string | null;
  description: string | null;
}

export interface Subscription {
  id: number;
  coachId: number;
  name: string;
  price: number;
  durationInMonths: number;
  subscribtionsFeatures: SubscriptionFeature[];
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  gender: number;
  dateOfBirth: string;
  profilePicture: string | null;
  bio: string | null;
  ratingsCount: number;
  overallRating: number;
  subscribtions: Subscription[];
  coachesRatings: any[];
  isFavorite?: boolean; // New property;
  isSub?: boolean; // New property;
}

export interface UserResponse {
  isValidCredentials: boolean;
  isActive: boolean;
  isApproved: boolean;
  isLockedOut: boolean;
  lockoutEnd?: Date; // Optional, as it is nullable in C#
  userNameOrEmail: string;
  roles?: string[]; // Optional, as it is nullable in C#
  accessToken?: string; // Optional, as it is nullable in C#
  accessTokenExpiration?: Date; // Optional, as it is nullable in C#
  refreshTokenExpiration: Date;
}

// GET dto to get allcoaches

export interface SearchCriteria {
  includeCoachesRatings: boolean;
  searchCritrea?: string;
  genderFilterCritrea?: Gender;
  rateFilterCritrea?: RateFilter;
  ageFilterCritrea?: AgeFilter;
  priceFilterCritrea?: PriceFilter;
  pageSize: number;
  pageNumber: number;
  sortByCritrea?: SortBy;
  sortingDirection: SortingDirection;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female'
 
}

export enum RateFilter {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export enum AgeFilter {
  Young = 'Young',
  MiddleAged = 'MiddleAged',
  Senior = 'Senior'
}

export enum PriceFilter {
  Cheap = 'Cheap',
  Moderate = 'Moderate',
  Expensive = 'Expensive'
}

export enum SortBy {
  Rate = 'rate',
  Price = 'price',
  Age = 'age'
}

export enum SortingDirection {
  Ascending = 'Ascending',
  Descending = 'Descending'
}


//return getallcoaches
export interface PaginatedResult<T> {
  items: T[];
  totalItemsCount: number;
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}



export interface CoachDto {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Date;
  profilePicture?: string; // Not included in JSON by default
  sasProfilePicture?: string;
  certificate?: string; // Not included in JSON by default
  sasCertificate?: string;
  bio?: string;
  ratingsCount?: number;
  overallRating?: number;
  subscribtions: ISubscribtionDto[];
  coachesRatings: CoachRatingDto[];
}


export interface ISubscribtionDto {
  id: number;
  name: string;
  price: number;
  durationInMonths: number;
  subscribtionsFeatures: SubscribtionFeatureDto[];
}

export interface SubscribtionFeatureDto {
  subscribtionId: number;
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
