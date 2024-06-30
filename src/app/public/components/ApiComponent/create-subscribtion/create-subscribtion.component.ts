// // import { Component, OnInit } from '@angular/core';
// // import { CreateSubscribtionCommand } from 'src/app/public/Interfaces/coach/CreateSubscribtionCommand';
// // import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';
// // import { FeatureService } from 'src/app/public/services/ApIServices/feature.service';
// // import { FeatureDto } from 'src/app/public/Interfaces/coach/FeatureDto';
// // import { ChangeDetectorRef } from '@angular/core';


// // @Component({
// //   selector: 'app-create-subscribtion',
// //   templateUrl: './create-subscribtion.component.html',
// //   styleUrls: ['./create-subscribtion.component.scss']
// // })
// // export class CreateSubscribtionComponent implements OnInit {
// //   command: CreateSubscribtionCommand = {
// //     name: '',
// //     price: 0,
// //     durationInMonths: 0,
// //     subscribtionsFeatures: []
// //   };
// //   features: FeatureDto[] = [];
// //   selectedFeatures: FeatureDto[] = []; // Array to hold selected features
// //   featuresLoaded = false; 

// //   constructor(
// //     private subscribtionService: SubscribtionService,
// //     private featureService: FeatureService,
// //     private cdRef: ChangeDetectorRef
// //   ) {}

// //   ngOnInit(): void {
// //     this.loadFeatures();
// //     this.features;
// //   }

// //   // loadFeatures() {
// //   //   this.featureService.getAllFeatures().subscribe(
// //   //     (data: FeatureDto[]) => {
// //   //       console.log('Fetched features:', data);
// //   //       this.features = data; // Assign fetched data to features array
// //   //       console.log('Fetched features2:', this.features);
// //   //       this.cdRef.detectChanges();
// //   //     },
// //   //     (error) => {
// //   //       console.error('Error fetching features:', error);
// //   //     }
// //   //   );
// //   // }

// //   loadFeatures() {
// //     this.featureService.getAllFeatures().subscribe(
// //       (data: FeatureDto[]) => {
// //         console.log('Fetched features:', data);
// //         this.features = data; // Assign fetched data to features array
// //         this.featuresLoaded = true; // Set flag to true when features are loaded
// //         this.cdRef.detectChanges();
// //       },
// //       (error) => {
// //         console.error('Error fetching features:', error);
// //       }
// //     );
// //   }
  
// //   toggleFeatureSelection(feature: FeatureDto) {
// //     const index = this.selectedFeatures.findIndex(f => f.id === feature.id);
// //     if (index !== -1) {
// //       // Feature already selected, so remove it
// //       this.selectedFeatures.splice(index, 1);
// //     } else {
// //       // Feature not selected, so add it
// //       this.selectedFeatures.push(feature);
// //     }
// //   }

// //   isSelected(feature: FeatureDto): boolean {
// //     return this.selectedFeatures.some(f => f.id === feature.id);
// //   }

// //   removeFeature(index: number) {
// //     this.selectedFeatures.splice(index, 1);
// //   }

// //   onSubmit() {
// //     // Map selected featureIds to command
// //     this.command.subscribtionsFeatures = this.selectedFeatures.map(feature => ({
// //       featureId: feature.id
// //     }));

// //     this.subscribtionService.addSubscribtion(this.command).subscribe(
// //       response => {
// //         console.log('Subscription created successfully:', response);
// //         // Optionally, reset form fields or navigate to another page upon success
// //       },
// //       error => {
// //         console.error('Error creating subscription:', error);
// //         // Handle error appropriately, e.g., show an error message
// //       }
// //     );
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CreateSubscribtionCommand } from 'src/app/public/Interfaces/coach/CreateSubscribtionCommand';
// import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';
// import { FeatureService } from 'src/app/public/services/ApIServices/feature.service';
// import { FeatureDto } from 'src/app/public/Interfaces/coach/FeatureDto';
// import { ChangeDetectorRef } from '@angular/core';

// @Component({
//   selector: 'app-create-subscribtion',
//   templateUrl: './create-subscribtion.component.html',
//   styleUrls: ['./create-subscribtion.component.scss']
// })
// export class CreateSubscribtionComponent implements OnInit {
//   command: CreateSubscribtionCommand = {
//     name: '',
//     price: 0,
//     durationInMonths: 0,
//     subscribtionsFeatures: []
//   };
//   features: FeatureDto[] = [];
//   selectedFeatures: FeatureDto[] = []; // Array to hold selected features
//   featuresLoaded = false; // Flag to track whether features are loaded

//   constructor(
//     private subscribtionService: SubscribtionService,
//     private featureService: FeatureService,
//     private cdRef: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.loadFeatures();
//   }

//   loadFeatures() {
//     this.featureService.getAllFeatures().subscribe(
//       (data: FeatureDto[]) => {
//         console.log('Fetched features:', data);
//         this.features = data; // Assign fetched data to features array
//         this.featuresLoaded = true; // Set flag to true when features are loaded
//         this.cdRef.detectChanges();
//       },
//       (error) => {
//         console.error('Error fetching features:', error);
//       }
//     );
//   }

//   toggleFeatureSelection(feature: FeatureDto) {
//     const index = this.selectedFeatures.findIndex(f => f.id === feature.id);
//     if (index !== -1) {
//       // Feature already selected, so remove it
//       this.selectedFeatures.splice(index, 1);
//     } else {
//       // Feature not selected, so add it
//       this.selectedFeatures.push(feature);
//     }
//   }

//   isSelected(feature: FeatureDto): boolean {
//     return this.selectedFeatures.some(f => f.id === feature.id);
//   }

//   removeFeature(index: number) {
//     this.selectedFeatures.splice(index, 1);
//   }

//   onSubmit() {
//     // Map selected featureIds to command
//     this.command.subscribtionsFeatures = this.selectedFeatures.map(feature => ({
//       featureId: feature.id
//     }));

//     this.subscribtionService.addSubscribtion(this.command).subscribe(
//       response => {
//         console.log('Subscription created successfully:', response);
//         // Optionally, reset form fields or navigate to another page upon success
//       },
//       error => {
//         console.error('Error creating subscription:', error);
//         // Handle error appropriately, e.g., show an error message
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CreateSubscribtionCommand } from 'src/app/public/Interfaces/coach/CreateSubscribtionCommand';
import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';
import { FeatureService } from 'src/app/public/services/ApIServices/feature.service';
import { FeatureDto } from 'src/app/public/Interfaces/coach/FeatureDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-subscribtion',
  templateUrl: './create-subscribtion.component.html',
  styleUrls: ['./create-subscribtion.component.scss']
})
export class CreateSubscribtionComponent implements OnInit {
  command: CreateSubscribtionCommand = {
    name: '',
    price: 0,
    durationInMonths: 0,
    subscribtionsFeatures: []
  };
  features: FeatureDto[] = [];
  selectedFeatures: FeatureDto[] = []; // Array to hold selected features
  featuresLoaded = false; // Flag to track whether features are loaded

  constructor(
    private subscribtionService: SubscribtionService,
    private featureService: FeatureService
  ) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  // loadFeatures() {
  //   this.featureService.getAllFeatures().subscribe(
  //     (data: FeatureDto[]) => {
  //       console.log('Fetched features:', data);
  //     //  this.features = data; // Assign fetched data to features array
  //       this.featuresLoaded = true; // Set flag to true when features are loaded
  //       // this.features = Object.values(data);
  //       this.features = data;

  //     },
  //     (error) => {
  //       console.error('Error fetching features:', error);
  //     }
  //   );
  // }
  loadFeatures() {
    this.featureService.getAllFeatures().subscribe(
      (data: any) => { // Ensure 'data' is of the correct type returned by your API
        console.log('Fetched features:', data);
        this.features = data.features; // Assign the 'features' array from 'data' to 'this.features'
        this.featuresLoaded = true; // Set flag to true when features are loaded
      },
      (error) => {
        console.error('Error fetching features:', error);
      }
    );
  }
  

  toggleFeatureSelection(feature: FeatureDto) {
    const index = this.selectedFeatures.findIndex(f => f.id === feature.id);
    if (index !== -1) {
      // Feature already selected, so remove it
      this.selectedFeatures.splice(index, 1);
    } else {
      // Feature not selected, so add it
      this.selectedFeatures.push(feature);
    }
  }

  isSelected(feature: FeatureDto): boolean {
    return this.selectedFeatures.some(f => f.id === feature.id);
  }

  removeFeature(index: number) {
    this.selectedFeatures.splice(index, 1);
  }

  // onSubmit() {
  //   // Map selected featureIds to command

  //   console.log(this.command.subscribtionsFeatures);
  //   this.command.subscribtionsFeatures = this.selectedFeatures.map(feature => ({
  //     id: feature.id
  //   }));

  //   console.log(this.command);
  //   this.subscribtionService.addSubscribtion(this.command).subscribe(
  //     response => {
  //       console.log('Subscription created successfully:', response);
  //       // Optionally, reset form fields or navigate to another page upon success
  //     },
  //     error => {
  //       console.error('Error creating subscription:', error);
  //       // Handle error appropriately, e.g., show an error message
  //     }
  //   );
  // }
  onSubmit() {
    this.command.subscribtionsFeatures = this.selectedFeatures.map(feature => ({
      featureId: feature.id
    }));
  
    this.subscribtionService.addSubscribtion(this.command).subscribe(
      response => {
        console.log('Subscription created successfully:', response);
        // Optionally, reset form fields or navigate to another page upon success
      },
      error => {
        console.error('Error creating subscription:', error);
        // Handle error appropriately, e.g., show an error message to the user
        if (error instanceof HttpErrorResponse) {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          // Display a user-friendly error message to the UI
          // Example: this.errorMessage = 'Failed to create subscription. Please try again.';
        }
      }
    );
  }
  
}
