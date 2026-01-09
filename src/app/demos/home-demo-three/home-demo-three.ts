import { Component } from '@angular/core';
import { Navbar } from '../../common/navbar/navbar';
import { Banner } from './banner/banner';
import { Boxes } from './boxes/boxes';
import { Welcome } from './welcome/welcome';
import { Services } from './services/services';
import { WhyChooseUs } from './why-choose-us/why-choose-us';
import { GetAQuote } from './get-a-quote/get-a-quote';
import { Faq } from './faq/faq';
import { Feedback } from './feedback/feedback';
import { Blog } from '../../common/blog/blog';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-home-demo-three',
    standalone: true,
    imports: [Navbar, Banner, Boxes, Welcome, Services, WhyChooseUs, GetAQuote, Faq, Feedback, Blog, Footer],
    templateUrl: './home-demo-three.html',
    styleUrl: './home-demo-three.scss'
})
export class HomeDemoThree {}