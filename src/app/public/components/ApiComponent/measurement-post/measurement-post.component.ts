import { Component, OnInit } from '@angular/core';
import { MeasurementDto } from 'src/app/public/Interfaces/Athlete/MeasurementDto';
import { MeasurementService } from 'src/app/public/services/ApIServices/measurement.service';

@Component({
  selector: 'app-measurement-post',
  templateUrl: './measurement-post.component.html',
  styleUrls: ['./measurement-post.component.scss']
})
export class MeasurementPostComponent implements OnInit {
  newMeasurement: MeasurementDto = {
    athleteId: 0, // Initialize with a default value
    date: new Date(),
    weightInKg: 0,
    // Initialize other fields as needed
  };

  constructor(private measurementService: MeasurementService) {}

  ngOnInit(): void {
    // Ensure athleteId is fetched before component initialization
    this.measurementService.fetchEntityId();
  }

  addMeasurement(): void {
    const athleteId = this.measurementService.getAthleteId();
    if (athleteId !== 0) {
      this.newMeasurement.athleteId = athleteId; // Assign athleteId here
      this.measurementService.addMeasurement(athleteId, this.newMeasurement)
        .subscribe({
          next: (addedMeasurement) => {
            console.log('Measurement added successfully:', addedMeasurement);
            // Handle success, reset form, etc.
          },
          error: (error) => {
            console.error('Error adding measurement:', error);
            // Handle error as needed
          }
        });
    } else {
      console.error('Athlete ID is not fetched yet.');
    }
  }
}
