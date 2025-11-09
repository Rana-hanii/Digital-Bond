import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';
import { Hero } from './hero/hero';
import { NgxSpinnerModule } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { LazyLoadDirective } from '../../core/directives/lazy-load.directive';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Hero, LazyLoadDirective, NgxSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private observer!: IntersectionObserver;
  heroVisible = signal(true);

  // loaders used by the template (can't use arrow functions inline in templates)
  aboutLoader = () => import('./about/about').then(m => m.About);
  careersLoader = () => import('./careers/careers').then(m => m.Careers);
  serviceLoader = () => import('./service/service').then(m => m.Service);
  clientsLoader = () => import('./clients/clients').then(m => m.Clients);
  projectsLoader = () => import('./projects/projects').then(m => m.Projects);
  contactLoader = () => import('./contact/contact').then(m => m.Contact);

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
