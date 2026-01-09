import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-car-insurance-page',
    standalone: true,
    imports: [NgClass, TopHeader, Navbar, InnerPageBanner, Footer],
    templateUrl: './car-insurance-page.html',
    styleUrl: './car-insurance-page.scss'
})
export class CarInsurancePage {

    // Accordion
    openSectionIndex: number = 0;
    toggleSection(index: number): void {
        if (this.openSectionIndex === index) {
            this.openSectionIndex = -1;
        } else {
            this.openSectionIndex = index;
        }
    }
    isSectionOpen(index: number): boolean {
        return this.openSectionIndex === index;
    }

}