import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { GetAQuote } from '../../demos/home-demo-two/get-a-quote/get-a-quote';

@Component({
    selector: 'app-services-page',
    standalone: true,
    imports: [RouterLink, TopHeader, Navbar, InnerPageBanner, GetAQuote, Footer],
    templateUrl: './services-page.html',
    styleUrl: './services-page.scss'
})
export class ServicesPage {}