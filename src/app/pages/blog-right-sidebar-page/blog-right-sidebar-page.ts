import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { WidgetSidebar } from "../../common/widget-sidebar/widget-sidebar";

@Component({
    selector: 'app-blog-right-sidebar-page',
    standalone: true,
    imports: [RouterLink, TopHeader, Navbar, InnerPageBanner, Footer, WidgetSidebar],
    templateUrl: './blog-right-sidebar-page.html',
    styleUrl: './blog-right-sidebar-page.scss'
})
export class BlogRightSidebarPage {}