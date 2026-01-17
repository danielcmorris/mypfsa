import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [RouterLink, TopHeader, Navbar, InnerPageBanner, Footer],
    templateUrl: './products-page.html',
    styleUrl: './products-page.scss'
})
export class ProductsPage {}
