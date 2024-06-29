// measurement.dto.ts
export interface MeasurementDto {
    athleteId: number;
    date: Date;
    weightInKg: number;
    bodyFatPercentage?: number;
    bmi?: number;
    benchPressWeight?: number;
    squatWeight?: number;
    deadliftWeight?: number;
  }
  

  export interface Measurement {
    date: Date;
  }