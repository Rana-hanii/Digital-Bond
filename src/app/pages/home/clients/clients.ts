import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { IClient } from '../../../core/interfaces/IClint';
import { isPlatformBrowser } from '@angular/common';
import Aos from 'aos';

@Component({
  selector: 'app-clients',
  imports: [Carousel],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  clients: IClient[] = [];
  moreClients: IClient[] = [];
  responsiveOptions: any[] = [];
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngOnInit() {
    this.clients = [
      { name: 'client', image: 'client1.webp' },
      { name: 'client', image: 'client2.webp' },
      { name: 'client', image: 'client3.webp' },
      { name: 'client', image: 'client4.webp' },
      { name: 'client', image: 'client5.webp' },
      { name: 'client', image: 'client6.webp' },
      { name: 'client', image: 'client7.webp' },
      { name: 'client', image: 'client8.webp' },
      { name: 'client', image: 'client9.webp' },
      { name: 'client', image: 'client10.webp' },
      { name: 'client', image: 'client11.webp' },
      { name: 'client', image: 'client12.webp' },
      { name: 'client', image: 'client13.webp' },
      { name: 'client', image: 'client14.webp' },
      { name: 'client', image: 'client15.webp' },
      { name: 'client', image: 'client16.webp' },
      { name: 'client', image: 'client17.webp' },
      { name: 'client', image: 'client18.webp' },
      { name: 'client', image: 'client19.webp' },
      { name: 'client', image: 'client20.webp' },
      { name: 'client', image: 'client21.webp' },
      { name: 'client', image: 'client22.webp' },
    ];
    this.moreClients = [
      { name: 'client', image: 'clients-1.webp' },
      { name: 'client', image: 'clients-2.webp' },
      { name: 'client', image: 'clients-3.webp' },
      { name: 'client', image: 'clients-4.webp' },
      { name: 'client', image: 'clients-5.webp' },
      { name: 'client', image: 'clients-6.webp' },
      { name: 'client', image: 'clients-7.webp' },
      { name: 'client', image: 'clients-8.webp' },
      { name: 'client', image: 'clients-9.webp' },
      { name: 'client', image: 'clients-10.webp' },
      { name: 'client', image: 'clients-11.webp' },
      { name: 'client', image: 'clients-12.webp' },
      { name: 'client', image: 'clients-13.webp' },
      { name: 'client', image: 'clients-14.webp' },
      { name: 'client', image: 'clients-15.webp' },
      { name: 'client', image: 'clients-16.webp' },
      { name: 'client', image: 'clients-17.webp' },
      { name: 'client', image: 'clients-18.webp' },
      { name: 'client', image: 'clients-19.webp' },
      { name: 'client', image: 'clients-20.webp' },
      { name: 'client', image: 'clients-21.webp' },
      { name: 'client', image: 'clients-22.webp' },
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
          duration: 400,
          once: true,
          mirror: false,
          easing: 'ease-out-cubic',
          startEvent: 'DOMContentLoaded',
          offset: 120,
        });
        Aos.refresh();
      }
    }
}
