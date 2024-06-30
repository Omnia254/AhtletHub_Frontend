import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribeCommand } from 'src/app/public/Interfaces/Athlete/SubscribeCommand';
import { SubscribeService } from 'src/app/public/services/ApIServices/subscribe.service';
import {   jwtDecode } from 'jwt-decode';
import { TokenService } from 'src/app/public/services/ApIServices/token.service';


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
  accessToken: string = '';


  constructor(
    private route: ActivatedRoute, 
    private subscribeService: SubscribeService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.fetchEntityId();
  }
 


  fetchEntityId() {
    const entityId = this.tokenService.extractEntityIdFromToken();
    if (entityId !== null) {
      this.athleteId = entityId;
    } else {
      console.error('Entity ID not found or could not be extracted from token.');
    }
  }
  

  ngOnInit(): void {
    this.coachId = +this.route.snapshot.paramMap.get('coachId')!;
    this.subscribtionId = +this.route.snapshot.paramMap.get('subscribtionId')!;
    this.subscribtionDurationInMonth = +this.route.snapshot.paramMap.get('subscribtionDurationInMonth')!;
    this.subscribtionPrice = +this.route.snapshot.paramMap.get('subscribtionPrice')!;
    this.subscribtionName = this.route.snapshot.paramMap.get('subscribtionName')!;
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
        this.router.navigate(['/checkout']);
      },
      error => {
        console.error('Subscription failed', error);
        this.router.navigate(['/error']);
      }
    );
  }
}
