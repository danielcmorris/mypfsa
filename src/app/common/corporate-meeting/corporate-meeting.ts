import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corporate-meeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-meeting.html',
  styleUrl: './corporate-meeting.scss'
})
export class CorporateMeetingComponent {
  reportUrl = 'https://storage.googleapis.com/pfsa-public/reports/2024-AMC.pdf';
  reportImageUrl = 'https://storage.googleapis.com/pfsa-public/reports/2024-AMC.png';
}
