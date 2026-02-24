import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/agent.model';

@Component({
    selector: 'app-agents',
    standalone: true,
    imports: [CarouselModule],
    templateUrl: './agents.html',
    styleUrl: './agents.scss'
})
export class Agents implements OnInit {

    teamSlidesOptions: OwlOptions = {
        nav: true,
        loop: true,
        margin: 30,
        dots: false,
        autoplay: true,
        smartSpeed: 500,
        autoplayHoverPause: true,
        navText: [
            "<i class='flaticon-left-arrow'></i>",
            "<i class='flaticon-right-arrow'></i>"
        ],
        responsive: {
            0: { items: 1 },
            515: { items: 2 },
            695: { items: 2 },
            935: { items: 3 },
            1115: { items: 3 }
        }
    };

    agents: Agent[] = [];

    private platformId = inject(PLATFORM_ID);

    constructor(private agentService: AgentsService) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.agentService.getAgents().subscribe((data: Agent[]) => {
                this.agents = data;
            });
        }
    }
}
