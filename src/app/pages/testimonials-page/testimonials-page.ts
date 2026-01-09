import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Feedback } from '../../common/feedback/feedback';
import { Footer } from '../../common/footer/footer';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Partners } from '../../common/partners/partners';

@Component({
    selector: 'app-testimonials-page',
    standalone: true,
    imports: [CarouselModule, TopHeader, Navbar, InnerPageBanner, Feedback, Partners, Footer],
    templateUrl: './testimonials-page.html',
    styleUrl: './testimonials-page.scss'
})
export class TestimonialsPage {

    // Owl Carousel
    testimonialsSliderOptions: OwlOptions = {
        nav: true,
        loop: true,
        margin: 25,
        dots: false,
        autoplay: true,
		smartSpeed: 500,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
        autoplayHoverPause: true,
        navText: [
			"<i class='flaticon-left-arrow'></i>",
			"<i class='flaticon-right-arrow'></i>"
        ],
		responsive:{
			0: {
				items: 1
			},
			515: {
				items: 1
			},
			695: {
				items: 2
			},
			935: {
				items: 2
			},
			1115: {
				items: 2
			}
		}
    }

}