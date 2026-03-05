import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FestaService } from '../../services/festa.service';
import { ApiFestaResponse } from '../../models/festa.model';

@Component({
  selector: 'app-festa-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './festa-list.html',
  styleUrl: './festa-list.scss'
})
export class FestaListComponent implements OnInit {
  festas: ApiFestaResponse[] = [];
  filteredFestas: ApiFestaResponse[] = [];
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
    this.festaService.getApiFestaList().subscribe({
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
    const citySet = new Set(this.festas.map(f => f.city).filter((c): c is string => !!c));
    this.cities = Array.from(citySet).sort();
  }

  extractCouncilNumbers(): void {
    const councilSet = new Set(
      this.festas
        .filter(f => f.councilCode)
        .map(f => f.councilCode as string)
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
        (festa.city ?? '').toLowerCase() === this.selectedCity.toLowerCase();
      const councilMatch = this.selectedCouncilNumber === '' ||
        festa.councilCode === this.selectedCouncilNumber;
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

  getFestaTitle(festa: ApiFestaResponse): string {
    if (festa.festaName && festa.festaName !== festa.organization) {
      return `${festa.organization} - ${festa.festaName}`;
    }
    return festa.organization;
  }

  getFirstEventDate(festa: ApiFestaResponse): string {
    if (festa.schedules && festa.schedules.length > 0) {
      const raw = festa.schedules[0].eventDate;
      const d = new Date(raw);
      return isNaN(d.getTime()) ? raw : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return '';
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatTime(timeStr: string | null): string {
    if (!timeStr) return '-';
    const d = new Date(timeStr);
    return isNaN(d.getTime()) ? timeStr : d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  navigateToForm(): void {
    this.router.navigate(['/account/festa-submit']);
  }
}
