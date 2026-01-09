import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-terms-conditions-page',
    standalone: true,
    imports: [TopHeader, Navbar, InnerPageBanner, Footer],
    templateUrl: './terms-conditions-page.html',
    styleUrl: './terms-conditions-page.scss'
})
export class TermsConditionsPage {}