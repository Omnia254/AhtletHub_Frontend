// import { Component, OnInit } from '@angular/core';
// import { MeasurementDto } from 'src/app/public/Interfaces/Athlete/MeasurementDto';
// import { MeasurementService } from 'src/app/public/services/ApIServices/measurement.service';

// @Component({
//   selector: 'app-measurement',
//   templateUrl: './measurement.component.html',
//   styleUrls: ['./measurement.component.scss']
// })
// export class MeasurementComponent implements OnInit {
//   measurement?: MeasurementDto;

//   constructor(private measurementService: MeasurementService) {}

//   ngOnInit(): void {
//     const athleteId = this.measurementService.getAthleteId();
//     const date = new Date(); // Use desired date

//     if (athleteId) {
//       this.fetchMeasurement(athleteId, date);
//     } else {
//       console.error('Athlete ID is not available.');
//     }
//   }

//   fetchMeasurement(athleteId: number, date: Date): void {
//     this.measurementService.getMeasurementByAthleteId(athleteId, date)
//       .subscribe({
//         next: (result) => {
          
//           this.measurement = result;
//           console.log(this.measurement);
//         },
//         error: (error) => {
//           console.error('Error fetching measurement:', error);
//         }
//       });
//   }
// }

import { Component, OnInit, HostBinding } from '@angular/core';
import { MeasurementDto } from 'src/app/public/Interfaces/Athlete/MeasurementDto';
import { MeasurementService } from 'src/app/public/services/ApIServices/measurement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {
  measurement?: MeasurementDto;
  @HostBinding('class') dFlex = 'd-flex flex-column flex-grow-1';

  constructor(private measurementService: MeasurementService, private router: Router) {}

  ngOnInit(): void {
    const athleteId = this.measurementService.getAthleteId();
    const date = new Date(); // Use desired date

    if (athleteId) {
      this.fetchMeasurement(athleteId, date);
    } else {
      this.router.navigate(["../public/login"]);
    }
  }

  fetchMeasurement(athleteId: number, date: Date): void {
    this.measurementService.getMeasurementByAthleteId(athleteId, date)
      .subscribe({
        next: (result) => {
          this.measurement = result;
          console.log(this.measurement);
        },
        error: (error) => {
          console.error('Error fetching measurement:', error);
        }
      });
  }

  // deleteMeasurement(date: Date): void {
  //   if (date) {
  //     this.measurementService.deleteMeasurement(date).subscribe(
  //       () => {
  //         console.log('Measurement deleted successfully');
  //         this.measurement = undefined; // Clear the measurement data after deletion
  //       },
  //       error => {
  //         console.error('Error deleting measurement:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Invalid date provided');
  //   }
  // }
  deleteMeasurement(date: any): void {
    const parsedDate = new Date(date); // Convert to Date object
  
    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      this.measurementService.deleteMeasurement(parsedDate).subscribe(
        () => {
          console.log('Measurement deleted successfully');
          this.measurement = undefined; // Clear the measurement data after deletion
        },
        error => {
          console.error('Error deleting measurement:', error);
        }
      );
    } else {
      console.error('Invalid date provided');
    }
  }
  
}
