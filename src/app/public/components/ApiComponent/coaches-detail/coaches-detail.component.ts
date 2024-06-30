// coach-detail.component.ts
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoachesService } from '../../../services/ApIServices/coaches.service';
import { CoachDto,Gender } from '../../../interfaces';
import { AthleteFavoriteService } from 'src/app/public/services/ApIServices/athlete-favorite.service';
import { SubscribeService } from 'src/app/public/services/ApIServices/subscribe.service';
import { CheckSubscribeResponseDto } from 'src/app/public/Interfaces/Athlete/CheckSubscribeResponseDto';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coaches-detail.component.html',
  styleUrls: ['./coaches-detail.component.scss'],
})
export class CoachesDetailComponent implements OnInit {
  Gender = Gender;
  coach: CoachDto | null = null;
  errorMessage: string = '';
  @HostBinding('class') dFlex = 'd-flex flex-grow-1';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coachService: CoachesService,
    private subscribeService:SubscribeService


  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; 
    this.coachService.getCoachById(id).subscribe(
      (data: CoachDto) => {
        setTimeout(()=>{
          this.coach = data;

        },400)
       // console.log(this.coach.bio?.length);
      },
      (error) => {
        this.errorMessage = 'There is no coach with the specified ID : ' + id;
      }
    );
  }

  // subscribe(coachId: number, subscribtionId: number,subscribtionDurationInMonth:number,subscribtionPrice:number,subscribtionName:string) {
  //   this.router.navigate(['/subscribe', coachId, subscribtionId,subscribtionDurationInMonth,subscribtionPrice,subscribtionName]);

  // }
  subscribe(coachId: number, subscriptionId: number, subscriptionDurationInMonths: number, subscriptionPrice: number, subscriptionName: string) {
   console.log(coachId, subscriptionId, subscriptionDurationInMonths, subscriptionPrice, subscriptionName);
    this.subscribeService.checkSubscribeAbility(coachId, subscriptionId).subscribe(
      (response: CheckSubscribeResponseDto) => {
        if (response.canSubscribe) {
          this.subscribeService.createCheckoutSession(subscriptionPrice, subscriptionName, 0, subscriptionId).subscribe(
            response => {
              console.log('Checkout session URL:', response.sessionUrl);
              window.location.href = response.sessionUrl; // Redirect user to the checkout session
            },
            error => {
              console.error('Error creating checkout session:', error);
              // Handle error accordingly
            }
          );
        //  console.log(response.canSubscribe);
         // this.router.navigate(['/subscribe', coachId, subscriptionId, subscriptionDurationInMonths, subscriptionPrice, subscriptionName]);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Error checking subscription ability';
      }
    );
  }
}
