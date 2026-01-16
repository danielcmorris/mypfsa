import { Component } from '@angular/core';
import { NewslettersComponent } from '../../common/newsletters/newsletters';
import { NewsletterComponent } from '../../common/newsletter/newsletter';
import { MagazineComponent } from '../../common/magazine/magazine';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Navbar } from '../../common/navbar/navbar';
import { TopHeader } from '../../common/top-header/top-header';
import { MagazinesComponent } from "../../common/magazines/magazines";

@Component({
  selector: 'app-publications-page',
  imports: [NewslettersComponent, NewsletterComponent, MagazineComponent, InnerPageBanner, Navbar, TopHeader, MagazinesComponent],
  templateUrl: './publications-page.html',
  styleUrl: './publications-page.scss',
})
export class PublicationsPage {

}
