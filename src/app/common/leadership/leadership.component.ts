import { Component, OnInit } from '@angular/core';
import { LeadershipCard } from '../leadership-card/leadership-card';
import { LeadershipSet } from '../../models/leadership.model';
import { LeadershipService } from '../../services/leadership.service';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [LeadershipCard],
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss'
})
export class LeadershipComponent implements OnInit {

  leadershipSets: LeadershipSet[] = [];

  constructor(private leadershipService: LeadershipService) { }

  ngOnInit(): void {
    this.leadershipService.getLeadershipSets().subscribe(data => {
      this.leadershipSets = data;
    });
  }
}
