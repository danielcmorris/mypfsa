import { Component } from '@angular/core';
import { LincComponent } from "../../common/linc/linc";
import { InnerPageBanner } from "../../common/inner-page-banner/inner-page-banner";
import { Navbar } from "../../common/navbar/navbar";
import { TopHeader } from "../../common/top-header/top-header";

@Component({
  selector: 'app-linc-page',
  imports: [LincComponent, InnerPageBanner, Navbar, TopHeader],
  templateUrl: './linc-page.html',
  styleUrl: './linc-page.scss',
})
export class LincPage {

}
