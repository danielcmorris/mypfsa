import { Component } from '@angular/core';
import { TopHeader } from '../../common/top-header/top-header';
import { Navbar } from '../../common/navbar/navbar';
import { InnerPageBanner } from '../../common/inner-page-banner/inner-page-banner';
import { Footer } from '../../common/footer/footer';
import { AgentListComponent } from "../../common/agent-list/agent-list.component";

@Component({
    selector: 'app-agents-page',
    standalone: true,
    imports: [TopHeader, Navbar, InnerPageBanner, Footer, AgentListComponent],
    templateUrl: './agents-page.html',
    styleUrl: './agents-page.scss'
})
export class AgentsPage {}