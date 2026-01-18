import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-account-top-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './account-top-header.html',
    styleUrl: './account-top-header.scss'
})
export class AccountTopHeader {
    private auth = inject(AuthService);

    logout(): void {
        this.auth.logout();
    }
}
