import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
   isHeroVisible = signal(true);
  activeSection = signal('hero');

  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
        // تعيين القسم الأول (hero) كقسم نشط عند بدء التشغيل
        this.activeSection.set('hero');
        this.isHeroVisible.set(true);
      
        // التمرير إلى أعلى الصفحة عند التحميل
        window.scrollTo(0, 0);
      
        // تأخير بدء مراقبة الأقسام لضمان تحميل الصفحة بالكامل
        window.addEventListener('load', () => {
          this.observeSections();
        });
    }
  }

  private observeSections() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.activeSection.set(entry.target.id);
            this.isHeroVisible.set(entry.target.id === 'hero');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
