import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));

  scrollToSection(event: Event, sectionId: string) {
  
    event.preventDefault();

    if (!this.isBrowser()) return;

    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${sectionId}`); 
    }
  }
}
