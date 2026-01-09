import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-claims-page',
    standalone: true,
    imports: [TopHeader, Navbar, InnerPageBanner, Footer],
    templateUrl: './claims-page.html',
    styleUrl: './claims-page.scss'
})
export class ClaimsPage {}