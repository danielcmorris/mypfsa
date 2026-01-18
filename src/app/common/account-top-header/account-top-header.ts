import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-account-top-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './account-top-header.html',
    styleUrl: './account-top-header.scss'
})
export class AccountTopHeader {

    constructor(
        public router: Router
    ) {}

    logout(): void {
        // TODO: Implement actual logout logic
        console.log('Logging out...');
        this.router.navigate(['/my-account']);
    }
}
