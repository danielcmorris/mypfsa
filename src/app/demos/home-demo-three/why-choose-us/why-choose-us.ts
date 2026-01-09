import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-why-choose-us',
    standalone: true,
    imports: [CarouselModule],
    templateUrl: './why-choose-us.html',
    styleUrl: './why-choose-us.scss'
})
export class WhyChooseUs {

    // Owl Carousel
    whyChooseUsSliderOptions: OwlOptions = {
        items:1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
		smartSpeed: 500,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
        autoplayHoverPause: true
    }

}