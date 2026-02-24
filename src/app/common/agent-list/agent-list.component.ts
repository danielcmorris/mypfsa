import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [],
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
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
