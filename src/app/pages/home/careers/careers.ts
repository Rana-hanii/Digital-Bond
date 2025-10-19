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
      { name: 'team', image: 'slider1.jpg' },
      { name: 'team', image: 'slider2.jpg' },
      { name: 'team', image: 'slider3.png' },
      { name: 'team', image: 'slider4.png' },
      { name: 'team', image: 'slider5.png' },
      { name: 'team', image: 'slider6.jpg' },
      { name: 'team', image: 'slider7.jpg' },
      { name: 'team', image: 'slider8.png' },
      { name: 'team', image: 'slider9.jpg' },
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
