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
  reportUrl = 'assets/documents/2024-amc-report.pdf';
  reportImageUrl = 'assets/images/2024-amc-report.jpg';
}
