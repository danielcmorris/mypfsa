import { Injectable } from '@angular/core';
import { NavigationMenu,MenuItem } from '../models/navigation.model'; 
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly navigationMenu: NavigationMenu = {
    mainMenu: [
      {
        label: 'Products',
        path: '/products',
        children: [
          { label: 'Find an Agent', path: '/products/find-agent' },
          {
            label: 'Life Insurance',
            path: '/products/life-insurance',
            children: [
              { label: 'Whole Life', path: '/products/life-insurance/whole-life' },
              { label: 'Term Life', path: '/products/life-insurance/term-life' },
              { label: 'Universal Life', path: '/products/life-insurance/universal-life' },
              { label: 'Wealth Transfer', path: '/products/life-insurance/wealth-transfer' }
            ]
          },
          {
            label: 'Retirement Savings',
            path: '/products/retirement-savings',
            children: [
              { label: 'Annuities - IRA', path: '/products/retirement-savings/annuities-ira' },
              { label: 'SEP IRAs', path: '/products/retirement-savings/sep-iras' }
            ]
          },
          { label: 'Educational Savings', path: '/products/educational-savings' }
        ]
      },
      {
        label: 'Publications',
        path: '/publications',
        children: [
          { label: 'Newsletters', path: '/publications/newsletters' },
          { label: 'Magazines', path: '/publications/magazines' },
          { label: 'Festas List', path: '/publications/festas-list' },
          { label: 'Mailing List', path: '/publications/mailing-list' },
          { label: 'Annual Corporate Meetings', path: '/publications/annual-meetings' }
        ]
      },
      {
        label: 'Events',
        path: '/events',
        children: [
          { label: 'Calendar of Events', path: '/events' }
        ]
      },
      {
        label: 'Programs',
        path: '/programs',
        children: [
          { label: 'Youth Sponsorship', path: '/programs/youth-sponsorship' },
          { label: 'Community Involvement', path: '/programs/community-involvement' }
        ]
      },
    //   {
    //     label: 'Services',
    //     path: '/services',
    //     children: [
    //       { label: 'Forms', path: '/services/forms' },
    //       { label: 'Claims', path: '/services/claims' }
    //     ]
    //   },
      {
        label: 'Scholarship',
        path: '/scholarship',
        children: [
          { label: 'Application and Requirements', path: '/scholarship/application' },
          { label: 'Education Grant Program', path: '/scholarship/grant-program' },
          { label: 'Giving', path: '/scholarship/giving' },
          { label: 'Foundation FAQs', path: '/scholarship/faq' }
        ]
      },
      {
        label: 'Membership',
        path: '/membership',
        children: [
          { label: 'Become a Member', path: '/membership/join' },
          { label: 'Refer a Friend', path: '/membership/refer-friend' },
          { label: 'Perkspot', path: '/membership/perkspot' }
        ]
      },
      {
        label: 'About Us',
        path: '/about',
        children: [
          { label: 'Leadership', path: '/about/leadership' },
          { label: 'Council Directory', path: '/about/council-directory' },
          { label: 'Library', path: '/about/library' },
          { label: 'Bylaws and Financial', path: '/about/bylaws-financial' },
          { label: 'Meet the Staff', path: '/contact/staff' },
          { label: 'Careers', path: '/contact/careers' }
        ]
      },
    //   {
    //     label: 'Contact Us',
    //     path: '/contact',
    //     children: [
    //       { label: 'Meet the Staff', path: '/contact/staff' },
    //       { label: 'Careers', path: '/contact/careers' }
    //     ]
    //   }
    ],
    socialLinks: [
      { label: 'Facebook', path: 'https://facebook.com', external: true, icon: 'facebook' },
      { label: 'Email', path: 'mailto:info@mypfsa.org', external: true, icon: 'email' }
    ]
  };

  getMainMenu(): MenuItem[] {
    return this.navigationMenu.mainMenu;
  }

  getSocialLinks(): MenuItem[] {
    return this.navigationMenu.socialLinks;
  }

  getAllMenu(): NavigationMenu {
    return this.navigationMenu;
  }
}
