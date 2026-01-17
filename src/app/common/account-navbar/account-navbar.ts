import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AccountMenuItem {
    label: string;
    path: string;
    icon: string;
}

@Component({
    selector: 'app-account-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './account-navbar.html',
    styleUrl: './account-navbar.scss'
})
export class AccountNavbar {
    isSticky: boolean = false;
    mobileMenuOpen: boolean = false;

    menuItems: AccountMenuItem[] = [
        { label: 'Dashboard', path: '/account/dashboard', icon: 'bx bx-grid-alt' },
        { label: 'Tools', path: '/account/tools', icon: 'bx bx-wrench' },
        { label: 'Forms', path: '/account/forms', icon: 'bx bx-file' },
        { label: 'Festas', path: '/account/festas', icon: 'bx bx-calendar-event' },
        { label: 'Council', path: '/account/council', icon: 'bx bx-group' },
        { label: 'Profile', path: '/account/profile', icon: 'bx bx-user' }
    ];

    @HostListener('window:scroll')
    onWindowScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isSticky = scrollPosition >= 50;
    }

    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    closeMobileMenu(): void {
        this.mobileMenuOpen = false;
    }
}
