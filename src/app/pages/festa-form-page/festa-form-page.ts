import { Component } from '@angular/core';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Navbar } from '../../common/navbar/navbar';
import { TopHeader } from '../../common/top-header/top-header';
import { FestaFormComponent } from '../../common/festa-form/festa-form';
import { Footer } from '../../common/footer/footer';

@Component({
  selector: 'app-festa-form-page',
  standalone: true,
  imports: [InnerPageBanner, Navbar, TopHeader, FestaFormComponent, Footer],
  templateUrl: './festa-form-page.html',
  styleUrl: './festa-form-page.scss',
})
export class FestaFormPage {

}
