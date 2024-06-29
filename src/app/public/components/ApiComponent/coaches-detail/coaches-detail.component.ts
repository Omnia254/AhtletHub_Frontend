// coach-detail.component.ts
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoachesService } from '../../../services/ApIServices/coaches.service';
import { CoachDto,Gender } from '../../../interfaces';
import { AthleteFavoriteService } from 'src/app/public/services/ApIServices/athlete-favorite.service';

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

  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; 
    this.coachService.getCoachById(id).subscribe(
      (data: CoachDto) => {
        this.coach = data;
        console.log(this.coach.bio?.length);
      },
      (error) => {
        this.errorMessage = 'There is no coach with the specified ID : ' + id;
      }
    );
  }

  subscribe(coachId: number, subscribtionId: number,subscribtionDurationInMonth:number,subscribtionPrice:number,subscribtionName:string) {
    this.router.navigate(['/subscribe', coachId, subscribtionId,subscribtionDurationInMonth,subscribtionPrice,subscribtionName]);

  }
}
