import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import Aos from 'aos';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-service',
  imports: [ButtonModule],
  templateUrl: './service.html',
  styleUrl: './service.css',
})
export class Service {
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      const isMobile = window.innerWidth < 768; // ممكن تغيري الرقم حسب تصميمك

      Aos.init({
        duration: 500,
        once: false,
        mirror: false,
        easing: 'ease-out-cubic',
        startEvent: 'DOMContentLoaded',
        offset: 150,
        disable: function () {
          return window.innerWidth < 768;
        },
      });
      Aos.refresh();
    }
  }
}
