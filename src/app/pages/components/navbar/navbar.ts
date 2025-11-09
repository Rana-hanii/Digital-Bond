import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
   isHeroVisible = signal(true);
  activeSection = signal('hero');

  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
      
        setTimeout(() => {
          this.initObserver();
          this.scrollToSection('hero'); 
        }, 700);
      }
    });
  }
 
  private initObserver() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting && id) {
            this.activeSection.set(id);
            this.isHeroVisible.set(id === 'hero');
          }
        }
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(id);
      this.isHeroVisible.set(id === 'hero');
    }
  }
}
