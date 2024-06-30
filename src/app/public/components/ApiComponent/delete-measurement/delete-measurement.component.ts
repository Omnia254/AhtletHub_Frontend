import { Component } from '@angular/core';
import { MeasurementService } from 'src/app/public/services/ApIServices/measurement.service';

@Component({
  selector: 'app-delete-measurement',
  templateUrl: './delete-measurement.component.html',
  styleUrls: ['./delete-measurement.component.scss']
})
export class DeleteMeasurementComponent {
  date: string = this.formatDate(new Date()); // Initialize with current date in 'yyyy-MM-dd' format

  constructor(private measurementService: MeasurementService) { }

  // Function to format date as 'yyyy-MM-dd'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  deleteMeasurement(): void {
    console.log('Date value:', this.date); // Log to check the value of this.date
    // Check if the date string matches the 'yyyy-MM-dd' format
    if (/^\d{4}-\d{2}-\d{2}$/.test(this.date)) {
      // Convert date string back to Date object
      const dateObj = new Date(this.date);
      // Proceed with delete operation
      this.measurementService.deleteMeasurement(dateObj).subscribe(
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
      console.error('Invalid date format provided');
    }
  }
}
