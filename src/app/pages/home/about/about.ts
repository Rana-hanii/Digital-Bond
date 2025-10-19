import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngAfterViewInit() {
   
    if (this.isBrowser()) {
      Aos.init({
        duration: 500,
        once: false,
        mirror: false,
        easing: 'ease-out-cubic',
        startEvent: 'DOMContentLoaded',
        offset: 150,
      });
      Aos.refresh();
    }
  }
}
