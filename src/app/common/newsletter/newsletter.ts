import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';
import { Newsletter } from '../../models/newsletter.model';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.scss'
})
export class NewsletterComponent implements OnInit {
  currentNewsletter: Newsletter | null = null;
  loading = true;
  error = false;

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.loadCurrentNewsletter();
  }

  loadCurrentNewsletter(): void {
    this.newsletterService.getNewsletters().subscribe({
      next: (data) => {
        // Get the most recent newsletter (first one after sorting)
        if (data.length > 0 && data[0].newsletters.length > 0) {
          this.currentNewsletter = data[0].newsletters[0];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading current newsletter:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}
