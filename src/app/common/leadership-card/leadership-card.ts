import { Component, Input } from '@angular/core';
import { LeadershipMember } from '../../models/leadership.model';

@Component({
  selector: 'app-leadership-card',
  imports: [],
  templateUrl: './leadership-card.html',
  styleUrl: './leadership-card.scss',
})
export class LeadershipCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imgPath!: string;
  @Input({ required: true }) caption!: string;
  @Input({ required: true }) members!: LeadershipMember[];
}
