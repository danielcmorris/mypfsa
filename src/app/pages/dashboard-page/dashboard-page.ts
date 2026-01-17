import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    memberSince: string;
    memberId: string;
    council: string;
    policyCount: number;
}

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountTopHeader,
        AccountNavbar,
        Footer
    ],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
    // Mock user data - will be replaced with actual data from auth service
    user: UserProfile = {
        firstName: 'John',
        lastName: 'Silva',
        email: 'john.silva@email.com',
        phone: '(209) 555-1234',
        memberSince: 'January 2020',
        memberId: 'PFSA-2020-12345',
        council: 'Modesto Council #42',
        policyCount: 2
    };

    quickLinks = [
        { label: 'View Policies', icon: 'bx bx-shield', path: '/account/tools', color: '#0390ef' },
        { label: 'Download Forms', icon: 'bx bx-download', path: '/account/forms', color: '#28a745' },
        { label: 'Upcoming Festas', icon: 'bx bx-calendar-event', path: '/account/festas', color: '#fd7e14' },
        { label: 'Council Events', icon: 'bx bx-group', path: '/account/council', color: '#6f42c1' }
    ];

    recentActivity = [
        { action: 'Policy payment processed', date: 'Jan 15, 2026', icon: 'bx bx-check-circle', color: '#28a745' },
        { action: 'Newsletter delivered', date: 'Jan 10, 2026', icon: 'bx bx-envelope', color: '#0390ef' },
        { action: 'Council meeting RSVP confirmed', date: 'Jan 5, 2026', icon: 'bx bx-calendar-check', color: '#fd7e14' }
    ];
}
