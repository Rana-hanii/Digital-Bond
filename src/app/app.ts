import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Digital-Bond');
  ngxSpinnerService = inject(NgxSpinnerService);
  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // * Spinner
    this.ngxSpinnerService.show();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 1000);

    // * SEO Meta Tags
    this.titleService.setTitle('Digital Bond | Creative Marketing Agency');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Digital Bond helps brands go beyond the limit through creativity and commitment.',
      },
      {
        name: 'keywords',
        content:
          'Digital Marketing, Web Development, SEO, Mobile Apps, Influencer Marketing, Media Production',
      },
      { name: 'author', content: 'Digital Bond' },
      {
        property: 'og:title',
        content: 'Digital Bond – Creative Marketing Agency',
      },
      {
        property: 'og:description',
        content:
          'We mix creativity and commitment to help brands grow beyond limits.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://digitalbondmena.com/og-image.jpg' },
      { property: 'og:url', content: 'https://digitalbondmena.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Digital Bond – Creative Marketing Agency' },
      {
        name: 'twitter:description',
        content:
          'Helping brands grow with creativity, innovation, and technology.',
      },
    ]);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
