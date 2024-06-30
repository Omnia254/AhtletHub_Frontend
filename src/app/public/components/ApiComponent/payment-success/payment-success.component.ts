import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {


  sessionId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
      this.sessionId = params.get('sessionId');
      console.log('Session ID:', this.sessionId);
      // You can now use sessionId as needed
    });
  }
  
}
