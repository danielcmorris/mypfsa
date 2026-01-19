import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { FestaFormComponent } from '../../common/festa-form/festa-form';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-festa-form-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountTopHeader,
        AccountNavbar,
        FestaFormComponent,
        Footer
    ],
    templateUrl: './festa-form-page.html',
    styleUrl: './festa-form-page.scss',
})
export class FestaFormPage {
}
