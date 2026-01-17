import { Component } from '@angular/core';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Navbar } from '../../common/navbar/navbar';
import { TopHeader } from '../../common/top-header/top-header';
import { FestaListComponent } from '../../common/festa-list/festa-list';
import { Footer } from '../../common/footer/footer';

@Component({
  selector: 'app-festa-schedule-page',
  standalone: true,
  imports: [InnerPageBanner, Navbar, TopHeader, FestaListComponent, Footer],
  templateUrl: './festa-schedule-page.html',
  styleUrl: './festa-schedule-page.scss',
})
export class FestaSchedulePage {

}
