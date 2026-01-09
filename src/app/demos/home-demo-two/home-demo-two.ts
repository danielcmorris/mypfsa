import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { Banner } from './banner/banner';
import { Boxes } from "../../common/boxes/boxes";
import { Welcome } from "../../common/welcome/welcome";
import { Funfacts } from "../../common/funfacts/funfacts";
import { Services } from './services/services';
import { WhyChooseUs } from './why-choose-us/why-choose-us';
import { GetAQuote } from './get-a-quote/get-a-quote';
import { Agents } from "../../common/agents/agents";
import { Partners } from "../../common/partners/partners";
import { Feedback } from './feedback/feedback';
import { Blog } from '../../common/blog/blog';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-home-demo-two',
    standalone: true,
    imports: [TopHeader, Navbar, Banner, Boxes, Welcome, Funfacts, Services, WhyChooseUs, GetAQuote, Agents, Partners, Feedback, Blog, Footer],
    templateUrl: './home-demo-two.html',
    styleUrl: './home-demo-two.scss'
})
export class HomeDemoTwo {}