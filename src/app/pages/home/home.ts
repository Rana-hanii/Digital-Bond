import { Component, inject } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { Navbar } from '../components/navbar/navbar';
import { About } from './about/about';
import { Careers } from './careers/careers';
import { Clients } from './clients/clients';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { Service } from './service/service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Footer,
    Hero,
    About,
    Careers,
    Service,
    Clients,
    Projects,
    Contact,NgxSpinnerModule
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
ngxSpinnerService=inject(NgxSpinnerService)
 ngOnInit(): void {
    this.ngxSpinnerService.show();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 4000);
  }
}
