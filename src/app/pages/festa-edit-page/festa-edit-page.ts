import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AccountTopHeader } from '../../common/account-top-header/account-top-header';
import { AccountNavbar } from '../../common/account-navbar/account-navbar';
import { FestaFormComponent } from '../../common/festa-form/festa-form';
import { Footer } from '../../common/footer/footer';

@Component({
    selector: 'app-festa-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        AccountTopHeader,
        AccountNavbar,
        FestaFormComponent,
        Footer
    ],
    templateUrl: './festa-edit-page.html',
    styleUrl: './festa-edit-page.scss',
})
export class FestaEditPage implements OnInit {
    festaId?: number;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.festaId = parseInt(id, 10);
        }
    }
}
