import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit {
  private vantaEffect: any;
  vantaLoaded = signal(false);

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;


    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out',
      disable: () => window.innerWidth < 768,
    });


    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();

        
          requestIdleCallback(async () => {
            await this.delayedVantaLoad();
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.el.nativeElement);
  }

  
  private async delayedVantaLoad() {
    await new Promise((res) => setTimeout(res, 800)); 
    await this.loadVantaEffect();
  }

  private async loadVantaEffect() {
    if (this.vantaLoaded()) return;
    await this.ensureVantaLoaded();

    if ((window as any).VANTA?.WAVES) {
      this.vantaEffect = (window as any).VANTA.WAVES({
        el: this.el.nativeElement,
        mouseControls: false,
        touchControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3c2222,
        shininess: 1.0,
        waveHeight: 12.0,
        waveSpeed: 1.0,
        zoom: 0.6,
      });
      this.vantaLoaded.set(true);
    }
  }

  private ensureVantaLoaded(): Promise<void> {
    const load = (src: string) =>
      new Promise<void>((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

    const threeCdn = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    const vantaCdn = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';

    return load(threeCdn).then(() => load(vantaCdn));
  }
}
