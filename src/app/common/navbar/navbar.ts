import { NgClass, NgFor, NgIf, ViewportScroller, AsyncPipe } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { MenuItem } from '../../models/navigation.model';
import { filter, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Observable, combineLatest, of } from 'rxjs';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgClass, NgFor, NgIf, AsyncPipe],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

    private auth = inject(AuthService);
    mainMenu$: Observable<MenuItem[]>;
    socialLinks: MenuItem[] = [];

    constructor(private navigationService: NavigationService,
        private router: Router,
        private viewportScroller: ViewportScroller
    ) {
        // Filter menu based on authentication state
        const allMenuItems = this.navigationService.getMainMenu();
        this.mainMenu$ = this.auth.isAuthenticated$.pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    return allMenuItems;
                }
                // Filter out "My Account" menu when not authenticated
                return allMenuItems.filter(item => item.label !== 'My Account');
            })
        );
    }
    ngOnInit() {
        this.socialLinks = this.navigationService.getSocialLinks();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const tree = this.router.parseUrl(this.router.url);
                if (tree.fragment) {
                    this.viewportScroller.scrollToAnchor(tree.fragment);
                }
            }, 100);
        });
    }

    // Responsive Menu Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Responsive Navbar Accordion
    openSectionIndex: number = -1;
    openSectionIndex2: number = -1;
    openSectionIndex3: number = -1;
    toggleSection(index: number): void {
        if (this.openSectionIndex === index) {
            this.openSectionIndex = -1;
        } else {
            this.openSectionIndex = index;
        }
    }
    toggleSection2(index: number): void {
        if (this.openSectionIndex2 === index) {
            this.openSectionIndex2 = -1;
        } else {
            this.openSectionIndex2 = index;
        }
    }
    toggleSection3(index: number): void {
        if (this.openSectionIndex3 === index) {
            this.openSectionIndex3 = -1;
        } else {
            this.openSectionIndex3 = index;
        }
    }
    isSectionOpen(index: number): boolean {
        return this.openSectionIndex === index;
    }
    isSectionOpen2(index: number): boolean {
        return this.openSectionIndex2 === index;
    }
    isSectionOpen3(index: number): boolean {
        return this.openSectionIndex3 === index;
    }

}


