import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Digital-Bond');
  ngxSpinnerService=inject(NgxSpinnerService)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
    this.ngxSpinnerService.show();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 3000);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId

    )) {
      initFlowbite();
    }
  }



}
