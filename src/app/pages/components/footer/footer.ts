import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  activeSection = signal('hero');

  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeSection.set('hero');
      window.addEventListener('load', () => {
        this.observeSections();
      });
    }
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
  private observeSections() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
