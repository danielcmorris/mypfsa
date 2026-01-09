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

@Component({
    selector: 'app-about-page',
    standalone: true,
    imports: [TopHeader, Navbar, InnerPageBanner, Funfacts, WhyChooseUs, Partners, Feedback, Agents, Footer],
    templateUrl: './about-page.html',
    styleUrl: './about-page.scss'
})
export class AboutPage {}