import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-get-a-quote',
    standalone: true,
    imports: [NgClass],
    templateUrl: './get-a-quote.html',
    styleUrl: './get-a-quote.scss'
})
export class GetAQuote {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}