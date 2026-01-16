import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {};

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, googleCalendarPlugin],
      initialView: 'dayGridMonth',
      googleCalendarApiKey: environment.googleCalendar.apiKey,
      events: {
        googleCalendarId: environment.googleCalendar.calendarId
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
      },
      height: 'auto',
      eventColor: '#667eea',
      eventTextColor: '#ffffff',
      dayMaxEvents: 3,
      eventDisplay: 'block',
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      }
    };
  }
}
