import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, signal, Inject, PLATFORM_ID, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import Aos from 'aos';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements AfterViewInit {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      requestAnimationFrame(() => Aos.refresh()); // ✅ أقل Forced Reflow
      Aos.init({
        duration: 500,
        once: false,
        mirror: false,
        easing: 'ease-out-cubic',
        startEvent: 'DOMContentLoaded',
        offset: 150,
        disable: () => window.innerWidth < 768,
      });
    }

    // ✅ Debounce على كل controls لتقليل reflows
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)!.valueChanges
        .pipe(debounceTime(100))
        .subscribe();
    });
  }

  // * Signals for form state
  formSubmitted = signal(false);
  loading = signal(false);

  // * Build form
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // * Computed signal: invalid state only after touch or submit
  isInvalid = (controlName: string) => {
    const control = this.contactForm.get(controlName);
    return control ? control.invalid && (control.touched || this.formSubmitted()) : false;
  };

  // * get error message for a control
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return `${this.capitalize(controlName)} is required`;
    if (control.hasError('email') || control.hasError('pattern'))
      return 'Please enter a valid email address';
    if (control.hasError('minlength')) {
      const len = control.errors?.['minlength'].requiredLength;
      return `${this.capitalize(controlName)} must be at least ${len} characters`;
    }
    return '';
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  async onSubmit() {
    this.formSubmitted.set(true);

    if (this.contactForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill in all required fields correctly.',
        life: 4000,
      });
      return;
    }

    this.loading.set(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.messageService.add({
        severity: 'success',
        summary: 'Message Sent Successfully 🎉',
        detail: 'Thank you for contacting us. We’ll get back to you soon!',
        life: 5000,
      });

      this.contactForm.reset();
      this.formSubmitted.set(false);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong. Please try again later.',
        life: 5000,
      });
    } finally {
      this.loading.set(false);
    }
  }
}
