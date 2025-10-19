import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
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
        offset: 120,
         disable: function () {
          return window.innerWidth < 768;
        },
      });
      Aos.refresh();
    }
  }
}
