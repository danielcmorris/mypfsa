import { Component } from '@angular/core';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Navbar } from '../../common/navbar/navbar';
import { TopHeader } from '../../common/top-header/top-header';
import { CalendarComponent } from '../../common/calendar/calendar';
import { FestasComponent } from '../../common/festas/festas';
import { CorporateMeetingComponent } from '../../common/corporate-meeting/corporate-meeting';
import { CurrentFestasComponent } from '../../common/current-festas/current-festas';
import { Footer } from "../../common/footer/footer";

@Component({
  selector: 'app-events-page',
  imports: [InnerPageBanner, Navbar, TopHeader, CalendarComponent, FestasComponent, CurrentFestasComponent, CorporateMeetingComponent, Footer],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export class EventsPage {

}
