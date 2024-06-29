import { Component, OnInit ,HostListener} from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showAboutUsAndFooter();
  }
  aboutUsVisible = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
  //   const max = document.documentElement.scrollHeight;

  //   if (pos >= max) {
  //     this.showAboutUsAndFooter();
  //   }
  // }

  showAboutUsAndFooter() {
    this.aboutUsVisible = true;
   
  }

}
