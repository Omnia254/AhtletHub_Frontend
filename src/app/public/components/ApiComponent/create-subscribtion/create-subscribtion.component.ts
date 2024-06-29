import { Component } from '@angular/core';
import { CreateSubscribtionCommand } from 'src/app/public/Interfaces/coach/CreateSubscribtionCommand';
import { SubscribtionService } from 'src/app/public/services/ApIServices/subscribtion.service';

@Component({
  selector: 'app-create-subscribtion',
  templateUrl: './create-subscribtion.component.html',
  styleUrls: ['./create-subscribtion.component.scss']
})
export class CreateSubscribtionComponent {
  command: CreateSubscribtionCommand = {
    name: '',
    price: 0,
    durationInMonths: 0,
    subscribtionsFeatures: []
  };

  constructor(private subscribtionService:SubscribtionService ) {}

  addFeature() {
    this.command.subscribtionsFeatures.push({ featureId: 0 });
  }

  removeFeature(index: number) {
    this.command.subscribtionsFeatures.splice(index, 1);
  }

  onSubmit() {
    this.subscribtionService.addSubscribtion(this.command).subscribe(
      response => {
        console.log('Subscription created successfully:', response);
      },
      error => {
        console.error('Error creating subscription:', error);
      }
    );
  }
}
