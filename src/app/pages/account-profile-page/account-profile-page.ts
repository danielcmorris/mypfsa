import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { Footer } from '../../common/footer/footer';

interface FamilyMember {
    id: number;
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    email: string;
    phone: string;
}

interface ProfileData {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;

    // Address Information
    address: string;
    city: string;
    state: string;
    zip: string;

    // Membership Information
    memberId: string;
    memberSince: string;
    council: string;
    councilNumber: string;

    // Communication Preferences
    emailNotifications: boolean;
    smsNotifications: boolean;
    newsletterSubscribed: boolean;

    // Family Members
    familyMembers: FamilyMember[];
}

@Component({
    selector: 'app-account-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AccountTopHeader,
        AccountNavbar,
        Footer
    ],
    templateUrl: './account-profile-page.html',
    styleUrl: './account-profile-page.scss'
})
export class AccountProfilePage implements OnInit {
    // Mock profile data - would come from an API in production
    profileData: ProfileData = {
        firstName: 'John',
        lastName: 'Silva',
        email: 'john.silva@email.com',
        phone: '(209) 555-1234',
        dateOfBirth: '1985-06-15',
        address: '123 Main Street',
        city: 'Modesto',
        state: 'CA',
        zip: '95354',
        memberId: 'PFSA-2020-12345',
        memberSince: '2020-01-15',
        council: 'Modesto Council',
        councilNumber: '42',
        emailNotifications: true,
        smsNotifications: false,
        newsletterSubscribed: true,
        familyMembers: [
            {
                id: 1,
                firstName: 'Maria',
                lastName: 'Silva',
                relationship: 'Spouse',
                dateOfBirth: '1987-03-22',
                email: 'maria.silva@email.com',
                phone: '(209) 555-5678'
            },
            {
                id: 2,
                firstName: 'Antonio',
                lastName: 'Silva',
                relationship: 'Child',
                dateOfBirth: '2015-08-10',
                email: '',
                phone: ''
            }
        ]
    };

    originalData: ProfileData | null = null;
    saving = false;
    saveSuccess = false;
    saveError = false;
    hasChanges = false;

    relationshipOptions = [
        'Spouse',
        'Child',
        'Parent',
        'Sibling',
        'Grandparent',
        'Grandchild',
        'Other'
    ];

    stateOptions = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    private nextFamilyMemberId = 100;

    ngOnInit(): void {
        // Store original data for comparison
        this.originalData = JSON.parse(JSON.stringify(this.profileData));
    }

    onFieldChange(): void {
        this.hasChanges = JSON.stringify(this.profileData) !== JSON.stringify(this.originalData);
        this.saveSuccess = false;
        this.saveError = false;
    }

    addFamilyMember(): void {
        this.profileData.familyMembers.push({
            id: this.nextFamilyMemberId++,
            firstName: '',
            lastName: '',
            relationship: '',
            dateOfBirth: '',
            email: '',
            phone: ''
        });
        this.onFieldChange();
    }

    removeFamilyMember(index: number): void {
        this.profileData.familyMembers.splice(index, 1);
        this.onFieldChange();
    }

    isFormValid(): boolean {
        return this.profileData.firstName.trim() !== '' &&
               this.profileData.lastName.trim() !== '' &&
               this.profileData.email.trim() !== '' &&
               this.profileData.email.includes('@');
    }

    saveProfile(): void {
        if (!this.isFormValid()) return;

        this.saving = true;
        this.saveError = false;

        // Simulate API call
        setTimeout(() => {
            // In production, this would be an HTTP POST/PUT to save the profile
            this.saving = false;
            this.saveSuccess = true;
            this.hasChanges = false;
            this.originalData = JSON.parse(JSON.stringify(this.profileData));

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                this.saveSuccess = false;
            }, 5000);
        }, 1500);
    }

    cancelChanges(): void {
        if (this.originalData) {
            this.profileData = JSON.parse(JSON.stringify(this.originalData));
            this.hasChanges = false;
        }
    }

    formatMemberSince(): string {
        if (!this.profileData.memberSince) return '';
        const date = new Date(this.profileData.memberSince);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
}
