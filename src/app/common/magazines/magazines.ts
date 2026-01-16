import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MagazineService } from '../../services/magazine.service';
import { MagazinesByYear } from '../../models/magazine.model';

@Component({
  selector: 'app-magazines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magazines.html',
  styleUrl: './magazines.scss'
})
export class MagazinesComponent implements OnInit {
  magazinesByYear: MagazinesByYear[] = [];
  loading = true;
  error = false;

  constructor(private magazineService: MagazineService) {}

  ngOnInit(): void {
    this.loadMagazines();
  }

  loadMagazines(): void {
    this.magazineService.getMagazines().subscribe({
      next: (data) => {
        this.magazinesByYear = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading magazines:', err);
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
