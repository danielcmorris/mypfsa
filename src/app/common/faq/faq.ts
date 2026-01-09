import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [NgClass],
    templateUrl: './faq.html',
    styleUrl: './faq.scss'
})
export class Faq {

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

    // Video Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

}