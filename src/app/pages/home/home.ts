import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Careers } from './careers/careers';
import { Service } from './service/service';
import { Clients } from './clients/clients';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    Navbar,
    Footer,
    Hero,
    About,
    Careers,
    Service,
    Clients,
    Projects,
    Contact,
    Hero
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
