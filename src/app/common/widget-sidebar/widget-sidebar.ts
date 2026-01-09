import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-widget-sidebar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './widget-sidebar.html',
    styleUrl: './widget-sidebar.scss'
})
export class WidgetSidebar {}