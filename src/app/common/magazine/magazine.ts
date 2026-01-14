import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';
import { Newsletter } from '../../models/newsletter.model';

@Component({
  selector: 'app-magazine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magazine.html',
  styleUrl: './magazine.scss'
})
export class MagazineComponent implements OnInit {
  currentMagazine: Newsletter | null = null;
  loading = true;
  error = false;

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.loadCurrentMagazine();
  }

  loadCurrentMagazine(): void {
    this.newsletterService.getNewsletters().subscribe({
      next: (data) => {
        // Get the most recent magazine (looking for type='magazine')
        for (const yearGroup of data) {
          const magazine = yearGroup.newsletters.find(item => item.type === 'magazine');
          if (magazine) {
            this.currentMagazine = magazine;
            break;
          }
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading current magazine:', err);
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
