import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss']
})
export class PriceCardComponent {
  @Input() title!: string;
  @Input() price!: string;
  @Input() features: string[] = [];
  @Input() buttonText: string = 'Select';

  @Output() select = new EventEmitter<void>();

  onSelect() {
    this.select.emit();
  }
}
