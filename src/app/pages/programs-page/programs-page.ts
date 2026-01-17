import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { ProgramsOverviewComponent } from '../../common/programs-overview/programs-overview';
import { YouthSponsorshipComponent } from '../../common/youth-sponsorship/youth-sponsorship';
import { CommunityInvolvementComponent } from '../../common/community-involvement/community-involvement';

@Component({
    selector: 'app-programs-page',
    standalone: true,
    imports: [
        TopHeader,
        Navbar,
        InnerPageBanner,
        Footer,
        ProgramsOverviewComponent,
        YouthSponsorshipComponent,
        CommunityInvolvementComponent
    ],
    templateUrl: './programs-page.html',
    styleUrl: './programs-page.scss'
})
export class ProgramsPage {}
