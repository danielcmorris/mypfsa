import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-top-header',
    standalone: true,
    imports: [RouterLink, NgClass],
    templateUrl: './top-header.html',
    styleUrl: './top-header.scss'
})
export class TopHeader {

    constructor (
        public router: Router
    ) {}

}