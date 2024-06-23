import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss']
})


export class CarouselHomeComponent {

  @Input() slides: { imageUrl: string, altText: string }[] = [];

}


