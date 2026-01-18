import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface Tool {
    title: string;
    description: string;
    icon: string;
    path: string;
    color: string;
    badge?: string;
}

@Component({
    selector: 'app-account-tools-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountTopHeader,
        AccountNavbar,
        Footer
    ],
    templateUrl: './account-tools-page.html',
    styleUrl: './account-tools-page.scss'
})
export class AccountToolsPage {
    tools: Tool[] = [
        {
            title: 'Life Insurance Needs Calculator',
            description: 'Calculate how much life insurance coverage you need to protect your family. Our LINC tool helps you understand your financial needs based on debts, expenses, education costs, and income replacement.',
            icon: 'bx bx-calculator',
            path: '/linc',
            color: '#0d6efd',
            badge: 'Popular'
        },
        {
            title: 'Find an Agent',
            description: 'Connect with a licensed PFSA agent in your area who can help you with life insurance, savings plans, and membership benefits.',
            icon: 'bx bx-user-voice',
            path: '/agents',
            color: '#198754'
        },
        {
            title: 'Policy Documents',
            description: 'Access and download your policy documents, certificates, and important account paperwork.',
            icon: 'bx bx-folder-open',
            path: '/account/forms',
            color: '#fd7e14'
        },
        {
            title: 'Council Directory',
            description: 'Find PFSA councils in your area and connect with your local Portuguese community.',
            icon: 'bx bx-map',
            path: '/about-us',
            color: '#6f42c1'
        }
    ];
}
