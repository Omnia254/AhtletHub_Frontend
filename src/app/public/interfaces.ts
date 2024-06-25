
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
