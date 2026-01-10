import { Component, OnInit } from '@angular/core';
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

  constructor(private agentsService: AgentsService) {}

  ngOnInit() {
    this.agentsService.getAgents().subscribe(data => {
      this.agents = data;
      this.loading = false;
    });
  }
}