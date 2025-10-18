import { Component, OnInit } from '@angular/core';

import { Carousel } from '../../components/carousel/carousel';

interface Team {
  name: string;
  image: string;
}

@Component({
  selector: 'app-careers',
  imports: [Carousel],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
})
export class Careers implements OnInit {
  teams: Team[] = [];
  responsiveOptions: any[] = [];

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
  }

  

