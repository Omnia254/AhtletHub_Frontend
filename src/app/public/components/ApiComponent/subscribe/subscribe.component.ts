import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribeCommand } from 'src/app/public/Interfaces/Athlete/SubscribeCommand';
import { SubscribeService } from 'src/app/public/services/ApIServices/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  athleteId: number = 0;
  coachId: number = 0;
  subscribtionId: number = 0;
  subscribtionDurationInMonth: number = 0;
  subscribtionPrice: number = 0;
  subscribtionName: string = '';
  

  constructor(
    private route: ActivatedRoute, 
    private subscribeService: SubscribeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.coachId = +this.route.snapshot.paramMap.get('coachId')!;
    this.subscribtionId = +this.route.snapshot.paramMap.get('subscribtionId')!;
    this.subscribtionDurationInMonth = +this.route.snapshot.paramMap.get('subscribtionDurationInMonth')!;
    this.subscribtionPrice = +this.route.snapshot.paramMap.get('subscribtionPrice')!;
    this.subscribtionName = this.route.snapshot.paramMap.get('subscribtionName')!;
   // this.athleteId = this.getAthleteIdFromLocalStorage();
    
   //For testing
    const athleteIdString = localStorage.getItem('athleteId');
    if (athleteIdString) {
      this.athleteId = parseInt(athleteIdString, 10); // Convert athleteIdString to number
    } else {
      console.log("Athlete ID not found in localStorage or is not a valid number.");
      // Handle this case according to your application logic
    }
    console.log(`Athlete ID: ${this.athleteId}`);
    
  }

  getAthleteIdFromLocalStorage(): number {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log(`User retrieved from local storage: ${user}`);
      return user.id; // Ensure this matches your user object structure
    } else {
      console.log("User not found in local storage");
      return 0; // Or handle this case according to your application logic
    }
  }

  subscribe() {
    console.log('Subscribe button clicked');
    const command: SubscribeCommand = {
      athleteId: this.athleteId,
      coachId: this.coachId,
      subscribtionId: this.subscribtionId,
      subscribtionDurationInMonth: this.subscribtionDurationInMonth,
      subscribtionPrice: this.subscribtionPrice,
      subscribtionName: this.subscribtionName
    };

    console.log('Subscribe command:', command);

    this.subscribeService.subscribe(command).subscribe(
      response => {
        console.log('Subscription successful', response);
        this.router.navigate(['/success']);
      },
      error => {
        console.error('Subscription failed', error);
        this.router.navigate(['/error']);
      }
    );
  }
}