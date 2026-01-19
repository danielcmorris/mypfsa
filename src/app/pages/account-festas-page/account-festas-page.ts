import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { FestaListComponent } from '../../common/festa-list/festa-list';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-account-festas-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountTopHeader,
        AccountNavbar,
        FestaListComponent,
        Footer
    ],
    templateUrl: './account-festas-page.html',
    styleUrl: './account-festas-page.scss'
})
export class AccountFestasPage {
}
