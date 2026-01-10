import { Component } from '@angular/core';
import { CouncilDirectoryService } from '../../services/council-directory.service';
import { Council } from '../../models/council.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-council-directory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './council-directory.component.html',
  styleUrl: './council-directory.component.scss'
})
export class CouncilDirectoryComponent {
  councils: Council[] = [];
  filteredCouncils: Council[] = [];
  loading = true;
  
  uniqueStates: string[] = [];
  uniqueCities: string[] = [];
  
  selectedState = 'all';
  selectedCity = 'all';

  constructor(private councilService: CouncilDirectoryService) {}

  ngOnInit() {
    this.councilService.getCouncils().subscribe(data => {
      this.councils = data;
      this.filteredCouncils = data;
      this.loading = false;
      
      // Extract unique states and cities
      this.uniqueStates = [...new Set(data.map(c => c.state).filter(s => s))].sort();
      this.uniqueCities = [...new Set(data.map(c => c.city).filter(c => c))].sort();
    });
  }

  onStateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedState = target.value;
    this.applyFilters();
  }

  onCityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCity = target.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCouncils = this.councils.filter(council => {
      const stateMatch = this.selectedState === 'all' || council.state === this.selectedState;
      const cityMatch = this.selectedCity === 'all' || council.city === this.selectedCity;
      return stateMatch && cityMatch;
    });
  }

  resetFilters() {
    this.selectedState = 'all';
    this.selectedCity = 'all';
    this.filteredCouncils = this.councils;
  }
}
