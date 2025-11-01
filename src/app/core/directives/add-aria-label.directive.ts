import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[addAriaLabels]',
})
export class AddAriaLabelsDirective implements AfterViewInit {
  @Input('addAriaLabel') labels: { prev?: string; next?: string } = {};

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const host = this.el.nativeElement as HTMLElement;

    const buttons = host.querySelectorAll('button');

    buttons.forEach((btn) => {
      if (btn.innerHTML.includes('chevron-left') || btn.className.includes('prev')) {
        btn.setAttribute('aria-label', this.labels.prev || 'Previous slide');
        btn.setAttribute('title', this.labels.prev || 'Previous slide');
      }

      if (btn.innerHTML.includes('chevron-right') || btn.className.includes('next')) {
        btn.setAttribute('aria-label', this.labels.next || 'Next slide');
        btn.setAttribute('title', this.labels.next || 'Next slide');
      }
    });
  }
}
