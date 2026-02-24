import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/agent.model';

@Component({
    selector: 'app-careers',
    standalone: true,
    imports: [CarouselModule],
    templateUrl: './careers.html',
    styleUrl: './careers.scss'
})
export class Careers implements OnInit {

    whyChooseUsSliderOptions: OwlOptions = {
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        smartSpeed: 500,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplayHoverPause: true
    };

    agents: Agent[] = [];
    loading = true;

    private platformId = inject(PLATFORM_ID);

    constructor(private agentsService: AgentsService) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.agentsService.getAgents().subscribe(data => {
                this.agents = data;
                this.loading = false;
            });
        }
    }
}
