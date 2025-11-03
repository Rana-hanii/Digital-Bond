import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';
import { About } from './about/about';
import { Careers } from './careers/careers';
import { Clients } from './clients/clients';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { Service } from './service/service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Footer,
    Hero,
    About,
    Careers,
    Service,
    Clients,
    Projects,
    Contact,
    NgxSpinnerModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private observer!: IntersectionObserver;
  heroVisible = signal(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const heroSection = document.querySelector('#hero');
      if (heroSection) {
        this.observer = new IntersectionObserver(
          ([entry]) => {
            this.heroVisible.set(entry.isIntersecting);
          },
          { threshold: 0.3 }
        );

        this.observer.observe(heroSection);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  isHeroVisible() {
    return this.heroVisible();
  }
}
