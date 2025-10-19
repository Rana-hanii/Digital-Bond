import { isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import AOS from 'aos';

declare global {
  interface Window {
    VANTA?: any;
    THREE?: any;
  }
}
@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  private vantaEffect: any;
  vantaLoaded = signal(false);

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    AOS.init({
      duration: 800,
      once: false,
      mirror: false,
      easing: 'ease-out-cubic',
      startEvent: 'DOMContentLoaded', // تشتغل بعد تحميل الصفحة
      offset: 0,
    });
    try {
      await this.ensureVantaLoaded();

      if ((window as any).VANTA && (window as any).VANTA.WAVES) {
        this.vantaEffect = (window as any).VANTA.WAVES({
          el: this.el.nativeElement,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3c2222,
          shininess: 1.0,
          waveHeight: 18.0,
          waveSpeed: 1.3,
          zoom: 0.65,
        });

        // حدثنا signal عشان نشير إنه جاهز
        this.vantaLoaded.set(true);
      } else {
        console.warn('VANTA script loaded but VANTA.WAVES is not available');
      }
    } catch (err) {
      console.error('Failed to load Vanta/Three scripts', err);
    }
  }

  ngOnDestroy() {
    if (this.vantaEffect && typeof this.vantaEffect.destroy === 'function') {
      this.vantaEffect.destroy();
    }
    this.vantaLoaded.set(false);
  }

  private ensureVantaLoaded(): Promise<void> {
    if ((window as any).VANTA && (window as any).THREE) return Promise.resolve();

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(new Error('Failed to load ' + src));
        document.body.appendChild(s);
      });

    const threeCdn = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    const vantaCdn = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';

    return loadScript(threeCdn)
      .then(() => loadScript(vantaCdn))
      .then(
        () =>
          new Promise<void>((resolve, reject) => {
            const start = Date.now();
            const check = () => {
              if ((window as any).VANTA) return resolve();
              if (Date.now() - start > 5000)
                return reject(new Error('VANTA did not become available in time'));
              setTimeout(check, 100);
            };
            check();
          })
      );
  }
}
