import { Component } from '@angular/core';
import { CalCalculatecaloryCommand, DailyActivityRate, Gender } from 'src/app/public/Interfaces/Athlete/cal-calculatecalory.interface';

import { CalCalculatecaloryService } from 'src/app/public/services/ApIServices/cal-calculatecalory.service';

@Component({
  selector: 'app-cal-calculatecalory',
  templateUrl: './cal-calculatecalory.component.html',
  styleUrls: ['./cal-calculatecalory.component.scss']
})
export class CalCalculatecaloryComponent {
  command: CalCalculatecaloryCommand = {
    weight: 0,
    height: 0,
    age: 0,
    gender: Gender.Male, // Default to Male
    dailyActivityRate: DailyActivityRate.Sedentary // Default to Sedentary
  };
  tdee: number | null = null;

  constructor(private calCalculatecaloryService: CalCalculatecaloryService) { }

  calculateCalories(): void {
    const commandToSend = {
      ...this.command,
      gender: Gender[this.command.gender as unknown as keyof typeof Gender], // Convert enum to number
      dailyActivityRate: DailyActivityRate[this.command.dailyActivityRate as unknown as keyof typeof DailyActivityRate] // Convert enum to number
    };

    console.log('Payload:', commandToSend); // Log the payload to verify
    this.calCalculatecaloryService.calculateCalories(commandToSend).subscribe(
      response => {
        this.tdee = response;
      },
      error => {
        console.error('Error calculating TDEE', error);
      }
    );
  }

  genderKeys(): string[] {
    return Object.keys(Gender).filter(k => isNaN(Number(k)));
  }

  dailyActivityRateKeys(): string[] {
    return Object.keys(DailyActivityRate).filter(k => isNaN(Number(k)));
  }
}
