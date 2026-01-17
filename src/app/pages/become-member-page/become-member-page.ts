import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { BecomeMemberComponent } from '../../common/become-member/become-member';
import { SignupFormComponent } from '../../common/signup-form/signup-form';

@Component({
    selector: 'app-become-member-page',
    standalone: true,
    imports: [
        TopHeader,
        Navbar,
        InnerPageBanner,
        Footer,
        BecomeMemberComponent,
        SignupFormComponent
    ],
    templateUrl: './become-member-page.html',
    styleUrl: './become-member-page.scss'
})
export class BecomeMemberPage {}
