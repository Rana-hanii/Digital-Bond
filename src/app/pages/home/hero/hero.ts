import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit {
  
  constructor( @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() =>  AOS.init({
      duration: 500,
      once: false,
      easing: 'ease-out',
      disable: () => window.innerWidth < 768,
    }), 1000);
   
}
}
