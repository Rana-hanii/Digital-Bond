import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isHeroVisible = signal(true);
  activeSection = signal('hero');

  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeSections();
    }
  }

  private observeSections() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
            this.isHeroVisible.set(entry.target.id === 'hero');
          }
        });
      },
      { threshold: 0.6 }
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
