import { Component } from '@angular/core';
import { MeasurementService } from 'src/app/public/services/ApIServices/measurement.service';

@Component({
  selector: 'app-delete-measurement',
  templateUrl: './delete-measurement.component.html',
  styleUrls: ['./delete-measurement.component.scss']
})
export class DeleteMeasurementComponent {
  date: Date = new Date(); // Initialize with current date/time

  constructor(private measurementService: MeasurementService) { }

  deleteMeasurement(): void {
    console.log('Date value:', this.date); // Log to check the value of this.date
    if (this.date instanceof Date && !isNaN(this.date.getTime())) {
      // Proceed with delete operation
      console.log(this.date);
      this.measurementService.deleteMeasurement(this.date).subscribe(
        () => {
          console.log('Measurement deleted successfully');
          // Optionally, add logic to notify the user or update the UI
        },
        error => {
          console.error('Error deleting measurement:', error);
          // Optionally, add logic to notify the user of the error
        }
      );
    } else {
      console.error('Invalid date provided');
    }
  }
  
}
