import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Coach, Subscription, SubscriptionFeature } from './../interfaces'; // Import Coach and related interfaces

@Injectable({
  providedIn: 'root'
})
export class MockCoachService {

  getCoaches(): Observable<{ items: Coach[] }> {
    const mockData: { items: Coach[] } = {
      items: [
        {
          id: 1,
          firstName: "Coach",
          lastName: "Coach",
          gender: 0,
          dateOfBirth: "2000-02-02",
          profilePicture: null,
          bio: "Experienced coach with various training plans.",
          ratingsCount: 5,
          overallRating: 4.5,
          subscribtions: [
            {
              id: 1,
              coachId: 1,
              name: "Basic Plan",
              price: 29.99,
              durationInMonths: 1,
              subscribtionsFeatures: [
                { subscribtionId: 1, featureId: 1, name: "Feature 1", description: "Basic feature 1" },
                { subscribtionId: 1, featureId: 5, name: "Feature 5", description: "Basic feature 5" },
                { subscribtionId: 1, featureId: 7, name: "Feature 7", description: "Basic feature 7" }
              ]
            },
            {
              id: 2,
              coachId: 1,
              name: "Standard Plan",
              price: 59.99,
              durationInMonths: 3,
              subscribtionsFeatures: [
                { subscribtionId: 2, featureId: 1, name: "Feature 1", description: "Standard feature 1" },
                { subscribtionId: 2, featureId: 4, name: "Feature 4", description: "Standard feature 4" },
                { subscribtionId: 2, featureId: 5, name: "Feature 5", description: "Standard feature 5" },
                { subscribtionId: 2, featureId: 7, name: "Feature 7", description: "Standard feature 7" },
                { subscribtionId: 2, featureId: 9, name: "Feature 9", description: "Standard feature 9" }
              ]
            },
            {
              id: 3,
              coachId: 1,
              name: "Premium Plan",
              price: 99.99,
              durationInMonths: 6,
              subscribtionsFeatures: [
                { subscribtionId: 3, featureId: 1, name: "Feature 1", description: "Premium feature 1" },
                { subscribtionId: 3, featureId: 3, name: "Feature 3", description: "Premium feature 3" },
                { subscribtionId: 3, featureId: 5, name: "Feature 5", description: "Premium feature 5" },
                { subscribtionId: 3, featureId: 7, name: "Feature 7", description: "Premium feature 7" },
                { subscribtionId: 3, featureId: 9, name: "Feature 9", description: "Premium feature 9" },
                { subscribtionId: 3, featureId: 11, name: "Feature 11", description: "Premium feature 11" },
                { subscribtionId: 3, featureId: 12, name: "Feature 12", description: "Premium feature 12" }
              ]
            }
          ],
          coachesRatings: []
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          gender: 1,
          dateOfBirth: "1990-05-15",
          profilePicture: null,
          bio: "Experienced fitness coach with a focus on strength training.",
          ratingsCount: 5,
          overallRating: 4.8,
          subscribtions: [
            {
              id: 4,
              coachId: 2,
              name: "Basic Plan",
              price: 39.99,
              durationInMonths: 1,
              subscribtionsFeatures: [
                { subscribtionId: 4, featureId: 1, name: "Feature 1", description: "Basic feature 1" },
                { subscribtionId: 4, featureId: 6, name: "Feature 6", description: "Basic feature 6" },
                { subscribtionId: 4, featureId: 7, name: "Feature 7", description: "Basic feature 7" }
              ]
            },
            {
              id: 5,
              coachId: 2,
              name: "Advanced Plan",
              price: 79.99,
              durationInMonths: 3,
              subscribtionsFeatures: [
                { subscribtionId: 5, featureId: 2, name: "Feature 2", description: "Advanced feature 2" },
                { subscribtionId: 5, featureId: 4, name: "Feature 4", description: "Advanced feature 4" },
                { subscribtionId: 5, featureId: 5, name: "Feature 5", description: "Advanced feature 5" },
                { subscribtionId: 5, featureId: 7, name: "Feature 7", description: "Advanced feature 7" }
              ]
            }
          ],
          coachesRatings: []
        },
        {
          id: 3,
          firstName: "John",
          lastName: "Smith",
          gender: 0,
          dateOfBirth: "1985-11-20",
          profilePicture: null,
          bio: "Specialized in weight training and fitness coaching.",
          ratingsCount: 10,
          overallRating: 4.7,
          subscribtions: [
            {
              id: 6,
              coachId: 3,
              name: "Standard Plan",
              price: 49.99,
              durationInMonths: 1,
              subscribtionsFeatures: [
                { subscribtionId: 6, featureId: 1, name: "Feature 1", description: "Standard feature 1" },
                { subscribtionId: 6, featureId: 3, name: "Feature 3", description: "Standard feature 3" },
                { subscribtionId: 6, featureId: 7, name: "Feature 7", description: "Standard feature 7" }
              ]
            },
            {
              id: 7,
              coachId: 3,
              name: "Premium Plan",
              price: 99.99,
              durationInMonths: 6,
              subscribtionsFeatures: [
                { subscribtionId: 7, featureId: 1, name: "Feature 1", description: "Premium feature 1" },
                { subscribtionId: 7, featureId: 2, name: "Feature 2", description: "Premium feature 2" },
                { subscribtionId: 7, featureId: 4, name: "Feature 4", description: "Premium feature 4" },
                { subscribtionId: 7, featureId: 5, name: "Feature 5", description: "Premium feature 5" },
                { subscribtionId: 7, featureId: 7, name: "Feature 7", description: "Premium feature 7" },
                { subscribtionId: 7, featureId: 9, name: "Feature 9", description: "Premium feature 9" }
              ]
            }
          ],
          coachesRatings: []
        }
      ]
    };

    return of(mockData);
  }
  getCoach(coachId: number): Observable<Coach> {
    // Mocking data for coach with ID 1
    const mockCoach: Coach = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: 0,
      dateOfBirth: '1990-01-01',
      profilePicture: null,
      bio: "Specialized in weight training and fitness coaching",
      ratingsCount: 10,
      overallRating: 4.7,
      subscribtions: [
        {
          id: 1,
          coachId: 1,
          name: 'Basic Plan',
          price: 29.99,
          durationInMonths: 1,
          subscribtionsFeatures: [
            { subscribtionId: 6, featureId: 1, name: "Feature 1", description: "Standard feature 1" },
            { subscribtionId: 6, featureId: 3, name: "Feature 3", description: "Standard feature 3" },
            { subscribtionId: 6, featureId: 7, name: "Feature 7", description: "Standard feature 7" }
          ]
        },
        {
          id: 2,
          coachId: 1,
          name: 'Standard Plan',
          price: 59.99,
          durationInMonths: 3,
          subscribtionsFeatures: [
            { subscribtionId: 6, featureId: 1, name: "Feature 1", description: "Standard feature 1" },
            { subscribtionId: 6, featureId: 3, name: "Feature 3", description: "Standard feature 3" },
            { subscribtionId: 6, featureId: 7, name: "Feature 7", description: "Standard feature 7" }
          ]
        }
       
        // Add more subscriptions if needed
      ],
      coachesRatings: []
     
    };

    return of(mockCoach); // Return an Observable of mockCoach
  }
}
