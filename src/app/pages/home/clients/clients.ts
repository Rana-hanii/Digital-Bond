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
      { name: 'client', image: 'client1.png' },
      { name: 'client', image: 'client2.png' },
      { name: 'client', image: 'client3.png' },
      { name: 'client', image: 'client4.png' },
      { name: 'client', image: 'client5.png' },
      { name: 'client', image: 'client6.png' },
      { name: 'client', image: 'client7.png' },
      { name: 'client', image: 'client8.png' },
      { name: 'client', image: 'client9.png' },
      { name: 'client', image: 'client10.png' },
      { name: 'client', image: 'client11.png' },
      { name: 'client', image: 'client12.png' },
      { name: 'client', image: 'client13.png' },
      { name: 'client', image: 'client14.png' },
      { name: 'client', image: 'client15.png' },
      { name: 'client', image: 'client16.png' },
      { name: 'client', image: 'client17.png' },
      { name: 'client', image: 'client18.png' },
      { name: 'client', image: 'client19.png' },
      { name: 'client', image: 'client20.png' },
      { name: 'client', image: 'client21.png' },
      { name: 'client', image: 'client22.png' },
    ];
    this.moreClients = [
      { name: 'client', image: 'clients-1.png' },
      { name: 'client', image: 'clients-2.png' },
      { name: 'client', image: 'clients-3.png' },
      { name: 'client', image: 'clients-4.png' },
      { name: 'client', image: 'clients-5.png' },
      { name: 'client', image: 'clients-6.png' },
      { name: 'client', image: 'clients-7.png' },
      { name: 'client', image: 'clients-8.png' },
      { name: 'client', image: 'clients-9.png' },
      { name: 'client', image: 'clients-10.png' },
      { name: 'client', image: 'clients-11.png' },
      { name: 'client', image: 'clients-12.png' },
      { name: 'client', image: 'clients-13.png' },
      { name: 'client', image: 'clients-14.png' },
      { name: 'client', image: 'clients-15.png' },
      { name: 'client', image: 'clients-16.png' },
      { name: 'client', image: 'clients-17.png' },
      { name: 'client', image: 'clients-18.png' },
      { name: 'client', image: 'clients-19.png' },
      { name: 'client', image: 'clients-20.png' },
      { name: 'client', image: 'clients-21.png' },
      { name: 'client', image: 'clients-22.png' },
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
          once: false,
          mirror: false,
          easing: 'ease-out-cubic',
          startEvent: 'DOMContentLoaded',
          offset: 120,
        });
        Aos.refresh();
      }
    }
}
