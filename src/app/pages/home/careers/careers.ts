import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { ITeam } from '../../../core/interfaces/ITeam';
import { isPlatformBrowser } from '@angular/common';
import Aos from 'aos';

@Component({
  selector: 'app-careers',
  imports: [Carousel],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
})
export class Careers implements OnInit {
  teams: ITeam[] = [];
  responsiveOptions: any[] = [];
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngOnInit() {
    this.teams = [
      { name: 'team', image: 'slider1.webp' },
      { name: 'team', image: 'slider2.webp' },
      { name: 'team', image: 'slider3.webp' },
      { name: 'team', image: 'slider4.webp' },
      { name: 'team', image: 'slider5.webp' },
      { name: 'team', image: 'slider6.webp' },
      { name: 'team', image: 'slider7.webp' },
      { name: 'team', image: 'slider8.webp' },
      { name: 'team', image: 'slider9.webp' },
    ];
    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
      { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
      { breakpoint: '767px', numVisible: 1, numScroll: 1 },
    ];
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
        disable: function () {
          return window.innerWidth < 768;
        },
      });
      Aos.refresh();
    }
  }
}
