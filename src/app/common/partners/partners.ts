import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-partners',
    standalone: true,
    imports: [CarouselModule, NgClass],
    templateUrl: './partners.html',
    styleUrl: './partners.scss'
})
export class Partners {

	constructor (
        public router: Router
    ) {}

    // Owl Carousel
    partnerSlidesOptions: OwlOptions = {
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 500,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2
			},
			515: {
				items: 3
			},
			695: {
				items: 4
			},
			935: {
				items: 5
			},
			1115: {
				items: 5
			}
		}
    }

}