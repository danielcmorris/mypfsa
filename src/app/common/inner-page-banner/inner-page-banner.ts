import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-inner-page-banner',
    standalone: true,
    imports: [RouterLink, NgStyle],
    templateUrl: './inner-page-banner.html',
    styleUrl: './inner-page-banner.scss'
})
export class InnerPageBanner {

    @Input() pageTitle: string = '';
    @Input() backgroundImage: string = '';

}