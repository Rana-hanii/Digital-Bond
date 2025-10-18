import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Digital-Bond');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
    // keep lifecycle for future use if needed
  }

  ngAfterViewInit(): void {
    // Only initialize Flowbite in the browser (document is not available on server)
    if (isPlatformBrowser(this.platformId

    )) {
      initFlowbite();
    }
  }
}
