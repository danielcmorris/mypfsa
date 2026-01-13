import { Component } from '@angular/core';
 
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AgentsService } from '../../services/agents.service';

@Component({
    selector: 'app-careers',
    standalone: true,
    imports: [ CarouselModule],
    templateUrl: './careers.html',
    styleUrl: './careers.scss'
})
export class Careers {

    // Owl Carousel
    whyChooseUsSliderOptions: OwlOptions = {
        items:1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
		smartSpeed: 500,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
        autoplayHoverPause: true
    }

    agents: any[] = [];
    loading = true; 
  constructor(private agentsService: AgentsService) {}


    ngOnInit() {
          this.agentsService.getAgents().subscribe(data => {
      this.agents = data;
      this.loading = false;
    });
    }   
}