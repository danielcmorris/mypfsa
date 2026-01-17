import { Component } from '@angular/core';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Navbar } from '../../common/navbar/navbar';
import { TopHeader } from '../../common/top-header/top-header';
import { CurrentFestasComponent } from '../../common/current-festas/current-festas';
import { Footer } from '../../common/footer/footer';

@Component({
  selector: 'app-festas-page',
  standalone: true,
  imports: [InnerPageBanner, Navbar, TopHeader, CurrentFestasComponent, Footer],
  templateUrl: './festas-page.html',
  styleUrl: './festas-page.scss',
})
export class FestasPage {

}
