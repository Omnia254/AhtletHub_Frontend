// coach-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoachesService } from '../../../services/ApIServices/coaches.service';
import { CoachDto } from '../../../interfaces';
import { AthleteFavoriteService } from 'src/app/public/services/ApIServices/athlete-favorite.service';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coaches-detail.component.html',
  styleUrls: ['./coaches-detail.component.scss']
})
export class CoachesDetailComponent implements OnInit {
  coach: CoachDto | null = null;
  errorMessage: string = '';


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
      },
      (error) => {
        this.errorMessage = 'There is no coach with that Id';
      }
    );
  }

  subscribe(coachId: number, subscribtionId: number,subscribtionDurationInMonth:number,subscribtionPrice:number,subscribtionName:string) {
    //console.log("i hit sub");
    this.router.navigate(['/subscribe', coachId, subscribtionId,subscribtionDurationInMonth,subscribtionPrice,subscribtionName]);

  }
  

}
