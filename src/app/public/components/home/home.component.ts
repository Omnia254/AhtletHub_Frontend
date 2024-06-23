import { Component, OnInit ,HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(plan: string) {
    console.log(`Selected plan: ${plan}`);
    // Handle the selection logic here, e.g., navigate to another page or show a modal
  }
  aboutUsVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this.showAboutUsAndFooter();
    }
  }

  showAboutUsAndFooter() {
    this.aboutUsVisible = true;
   
  }

  
}
