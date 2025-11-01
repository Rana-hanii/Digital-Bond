import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AddAriaLabelsDirective } from '../../../core/directives/add-aria-label.directive';


@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule, TagModule, ButtonModule,AddAriaLabelsDirective],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  @Input() items: any[] = [];
  @Input() responsiveOptions: any;
  @Input() circular: boolean = true;
  @Input() autoplayInterval: number = 2000;
  @Input() folder: string = '';
  @Input() numVisible: number = 4;
  @Input() numScroll: number = 1;
  prevButtonProps = {
    'aria-label': 'Previous slide',
    title: 'Previous',
  } as any;

  nextButtonProps = {
    'aria-label': 'Next slide',
    title: 'Next',
  } as any;

  getImagePath(image: string): string {
    if (!image) return '/images/placeholder.jpg';
    return image.startsWith('/images/') ? image : `/images/${this.folder}/${image}`;
  }
  
}
