import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [RouterLink, TopHeader, Navbar, Footer],
    templateUrl: './error-page.html',
    styleUrl: './error-page.scss'
})
export class ErrorPage {}