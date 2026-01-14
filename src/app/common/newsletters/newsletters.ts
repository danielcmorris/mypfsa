import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';
import { NewslettersByYear } from '../../models/newsletter.model';

@Component({
  selector: 'app-newsletters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletters.html',
  styleUrl: './newsletters.scss'
})
export class NewslettersComponent implements OnInit {
  newslettersByYear: NewslettersByYear[] = [];
  loading = true;
  error = false;

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.loadNewsletters();
  }

  loadNewsletters(): void {
    this.newsletterService.getNewsletters().subscribe({
      next: (data) => {
        this.newslettersByYear = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading newsletters:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long' });
  }
}
