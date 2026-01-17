import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { ScholarshipComponent } from '../../common/scholarship/scholarship';
import { ScholarshipsComponent } from '../../common/scholarships/scholarships';
import { GrantsComponent } from '../../common/grants/grants';
import { GivingComponent } from '../../common/giving/giving';
import { ScholarshipFaqComponent } from '../../common/scholarship-faq/scholarship-faq';

@Component({
    selector: 'app-scholarship-page',
    standalone: true,
    imports: [
        TopHeader,
        Navbar,
        InnerPageBanner,
        Footer,
        ScholarshipComponent,
        ScholarshipsComponent,
        GrantsComponent,
        GivingComponent,
        ScholarshipFaqComponent
    ],
    templateUrl: './scholarship-page.html',
    styleUrl: './scholarship-page.scss'
})
export class ScholarshipPage {}
