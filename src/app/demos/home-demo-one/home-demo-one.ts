import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { Banner } from './banner/banner';
import { Partners } from '../../common/partners/partners';
import { Future } from '../../common/future/future';
import { About } from '../../common/about/about';
import { Services } from '../../common/services/services';
import { WhyChooseUs } from "../../common/why-choose-us/why-choose-us";
import { GetAQuote } from "../../common/get-a-quote/get-a-quote";
import { Feedback } from "../../common/feedback/feedback";
import { Agents } from "../../common/agents/agents";
import { Faq } from "../../common/faq/faq";
import { Blog } from "../../common/blog/blog";
import { Footer } from "../../common/footer/footer";

@Component({
    selector: 'app-home-demo-one',
    standalone: true,
    imports: [TopHeader, Navbar, Banner, Partners, Future, About, Services, WhyChooseUs, GetAQuote, Feedback, Agents, Faq, Blog, Footer],
    templateUrl: './home-demo-one.html',
    styleUrl: './home-demo-one.scss'
})
export class HomeDemoOne {}