import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  @Input('appLazyLoad') loader!: () => Promise<any>;

  private observer?: IntersectionObserver;
  private loaded = false;

  constructor(private host: ElementRef, private vcr: ViewContainerRef) {}

  ngAfterViewInit(): void {
    // If IntersectionObserver not supported, load immediately
    if (typeof IntersectionObserver === 'undefined') {
      this.load();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.loaded) {
            this.load();
            if (this.observer) {
              this.observer.disconnect();
            }
            break;
          }
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.host.nativeElement);
  }

  private async load() {
    if (this.loaded) return;
    this.loaded = true;

    try {
      const res = await this.loader();
      // Expect loader to return the component class (e.g. .then(m => m.About))
      const componentClass = res && res.default ? res.default : res;
  // Create the component in this location using the ViewContainerRef's injector
  this.vcr.clear();
  this.vcr.createComponent(componentClass, { injector: this.vcr.injector });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('LazyLoadDirective failed to load component', e);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
