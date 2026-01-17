import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FestaService } from '../../services/festa.service';
import { Festa } from '../../models/festa.model';

@Component({
  selector: 'app-current-festas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-festas.html',
  styleUrl: './current-festas.scss'
})
export class CurrentFestasComponent implements OnInit {
  upcomingFestas: Festa[] = [];
  pastFestas: Festa[] = [];
  isLoading = true;

  constructor(
    private festaService: FestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFestas();
  }

  loadFestas(): void {
    this.festaService.getFestas().subscribe({
      next: (festas) => {
        this.categorizeFestas(festas);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading festas:', error);
        this.isLoading = false;
      }
    });
  }

  categorizeFestas(festas: Festa[]): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: Festa[] = [];
    const past: Festa[] = [];

    festas.forEach(festa => {
      const festaDate = this.parseFestaDate(festa);
      if (festaDate && festaDate >= today) {
        upcoming.push(festa);
      } else if (festaDate) {
        past.push(festa);
      }
    });

    // Sort upcoming by date ascending (soonest first)
    this.upcomingFestas = upcoming.sort((a, b) => {
      const dateA = this.parseFestaDate(a);
      const dateB = this.parseFestaDate(b);
      return (dateA?.getTime() || 0) - (dateB?.getTime() || 0);
    });

    // Sort past by date descending (most recent first) and take last 5
    this.pastFestas = past
      .sort((a, b) => {
        const dateA = this.parseFestaDate(a);
        const dateB = this.parseFestaDate(b);
        return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
      })
      .slice(0, 5);
  }

  parseFestaDate(festa: Festa): Date | null {
    if (!festa.schedule || festa.schedule.length === 0) {
      return null;
    }

    const dateStr = festa.schedule[0].date;
    // Handle date ranges like "Monday, April 21, 2025 to Friday, April 25, 2025"
    const firstDate = dateStr.split(' to ')[0].trim();

    // Parse dates like "Saturday, April 5, 2025"
    const parsed = this.parseDateString(firstDate);
    return parsed;
  }

  parseDateString(dateStr: string): Date | null {
    try {
      // Remove day of week if present (e.g., "Saturday, ")
      const withoutDay = dateStr.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, '');

      // Parse "April 5, 2025" or similar formats
      const date = new Date(withoutDay);

      if (!isNaN(date.getTime())) {
        return date;
      }
      return null;
    } catch {
      return null;
    }
  }

  getFestaTitle(festa: Festa): string {
    if (festa.festaName) {
      return `${festa.organizationName} - ${festa.festaName}`;
    }
    return festa.organizationName;
  }

  getFirstEventDate(festa: Festa): string {
    if (festa.schedule && festa.schedule.length > 0) {
      return festa.schedule[0].date;
    }
    return '';
  }

  getFormattedDate(festa: Festa): string {
    const date = this.parseFestaDate(festa);
    if (date) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return this.getFirstEventDate(festa);
  }

  viewAllFestas(): void {
    this.router.navigate(['/festa-schedule']);
  }

  viewFestaDetails(festa: Festa): void {
    this.router.navigate(['/festa-schedule'], { fragment: `festa-${festa.id}` });
  }
}
