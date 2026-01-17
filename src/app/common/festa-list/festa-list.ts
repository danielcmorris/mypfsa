import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FestaService } from '../../services/festa.service';
import { Festa } from '../../models/festa.model';

@Component({
  selector: 'app-festa-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festa-list.html',
  styleUrl: './festa-list.scss'
})
export class FestaListComponent implements OnInit {
  festas: Festa[] = [];
  filteredFestas: Festa[] = [];
  cities: string[] = [];
  councilNumbers: string[] = [];
  selectedCity: string = '';
  selectedCouncilNumber: string = '';
  expandedFestaIds: Set<number> = new Set();
  isLoading: boolean = true;

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
        this.festas = festas;
        this.filteredFestas = festas;
        this.extractCities();
        this.extractCouncilNumbers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading festas:', error);
        this.isLoading = false;
      }
    });
  }

  extractCities(): void {
    const citySet = new Set(this.festas.map(f => f.city));
    this.cities = Array.from(citySet).sort();
  }

  extractCouncilNumbers(): void {
    const councilSet = new Set(
      this.festas
        .filter(f => f.councilNumber)
        .map(f => f.councilNumber as string)
    );
    this.councilNumbers = Array.from(councilSet).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });
  }

  applyFilters(): void {
    this.filteredFestas = this.festas.filter(festa => {
      const cityMatch = this.selectedCity === '' ||
        festa.city.toLowerCase() === this.selectedCity.toLowerCase();
      const councilMatch = this.selectedCouncilNumber === '' ||
        festa.councilNumber === this.selectedCouncilNumber;
      return cityMatch && councilMatch;
    });
  }

  filterByCity(): void {
    this.applyFilters();
  }

  filterByCouncilNumber(): void {
    this.applyFilters();
  }

  toggleExpand(festaId: number): void {
    if (this.expandedFestaIds.has(festaId)) {
      this.expandedFestaIds.delete(festaId);
    } else {
      this.expandedFestaIds.add(festaId);
    }
  }

  isExpanded(festaId: number): boolean {
    return this.expandedFestaIds.has(festaId);
  }

  clearFilter(): void {
    this.selectedCity = '';
    this.selectedCouncilNumber = '';
    this.filteredFestas = this.festas;
  }

  hasActiveFilters(): boolean {
    return this.selectedCity !== '' || this.selectedCouncilNumber !== '';
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

  navigateToForm(): void {
    this.router.navigate(['/account/festa-submit']);
  }
}
