import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Funfacts } from "../../common/funfacts/funfacts";
import { WhyChooseUs } from "../../common/why-choose-us/why-choose-us";
import { Partners } from "../../common/partners/partners";
import { Feedback } from "../../common/feedback/feedback";
import { Agents } from "../../common/agents/agents";
import { Footer } from "../../common/footer/footer";
 
import { LeadershipComponent } from '../../common/leadership/leadership.component';
import { CouncilDirectoryComponent } from '../../common/council-directory/council-directory.component';
import { Library } from "../../common/library/library";
import { Bylaws } from '../../common/bylaws/bylaws';
import { AgentListComponent } from "../../common/agent-list/agent-list.component";
import { StaffComponent } from "../../common/staff/staff";
import { Careers } from '../../common/careers/careers';

@Component({
    selector: 'app-about-page',
    standalone: true,
    imports: [TopHeader, Navbar, InnerPageBanner,  WhyChooseUs,  Footer, LeadershipComponent, CouncilDirectoryComponent, Library, Bylaws, StaffComponent, Careers],
    templateUrl: './about-page.html',
    styleUrl: './about-page.scss'
})
export class AboutPage {}