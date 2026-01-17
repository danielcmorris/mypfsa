import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface FormItem {
    name: string;
    description: string;
    downloadUrl: string;
    icon: string;
    notarized?: boolean;
}

@Component({
    selector: 'app-account-forms-page',
    standalone: true,
    imports: [
        CommonModule,
        AccountTopHeader,
        AccountNavbar,
        Footer
    ],
    templateUrl: './account-forms-page.html',
    styleUrl: './account-forms-page.scss'
})
export class AccountFormsPage {
    forms: FormItem[] = [
        {
            name: 'Address Change Form',
            description: 'It is very important that we have your current mailing address, email and phone number. Use this form to update your contact information on file with PFSA.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0105-Address-Change.pdf',
            icon: 'bx bx-home'
        },
        {
            name: 'Change of Beneficiary',
            description: 'Use this form to add or change the beneficiary/ies on your PFSA life insurance policies or financial accounts.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0100-Change-of-Beneficiary.pdf',
            icon: 'bx bx-user-plus',
            notarized: true
        },
        {
            name: 'Change of Name',
            description: 'Use this form to update your policy records following marriage, divorce, or adoption. Ensure your documents reflect your current legal name.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0106-Name-Change-and-Address.pdf',
            icon: 'bx bx-id-card'
        },
        {
            name: 'EFT Payment Authorization',
            description: 'Schedule your payment to be automatically deducted from your checking or savings account. Convenient, automatic, and prevents late fees.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0508-EFT-Payment-Authorization.pdf',
            icon: 'bx bx-credit-card'
        },
        {
            name: 'Lost Policy',
            description: 'Request a duplicate copy of your misplaced life insurance or annuity contracts. We will issue a replacement document for your records.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0103-Affidavit-of-Lost-Policy.pdf',
            icon: 'bx bx-file-find',
            notarized: true
        },
        {
            name: 'Fraternal Council Transfer',
            description: 'Transfer your membership to another council when relocating. Get involved with your council and help make a change in your community.',
            downloadUrl: 'https://storage.googleapis.com/pfsa-public/forms/0106-Council-Transfer.pdf',
            icon: 'bx bx-transfer'
        }
    ];

    downloadForm(url: string): void {
        window.open(url, '_blank');
    }
}
