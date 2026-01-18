import { Injectable } from '@angular/core';
import { NavigationMenu, MenuItem } from '../models/navigation.model';
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
          { label: 'Find an Agent', path: '/agents' },
          {
            label: 'Life Insurance',
            path: '/products/life-insurance',
            // children: [
            //   { label: 'Whole Life', path: '/products/life-insurance/whole-life' },
            //   { label: 'Term Life', path: '/products/life-insurance/term-life' },
            //   { label: 'Universal Life', path: '/products/life-insurance/universal-life' },
            //   { label: 'Wealth Transfer', path: '/products/life-insurance/wealth-transfer' }
            // ]
          },
          {
            label: 'Savings & Retirement',
            path: '/products/savings',
            // children: [
            //   { label: 'Annuities - IRA', path: '/products/retirement-savings/annuities-ira' },
            //   { label: 'SEP IRAs', path: '/products/retirement-savings/sep-iras' }
            // ]
          },
          // { label: 'Educational Savings', path: '/products/educational-savings' }
        ]
      },
      {
        label: 'Publications',
        path: '/publications',
        children: [
          { label: 'Newsletters', path: '/publications', fragment: 'newsletter' },
          { label: 'Magazines', path: '/publications', fragment: 'magazine' },
          { label: 'Mailing List', path: '/publications/mailing-list' },
        ]
      },
      {
        label: 'Events',
        path: '/events',
        children: [


          { label: 'Festas', path: '/events', fragment: 'festas' },
          { label: 'Calendar of Events', path: '/events', fragment: 'calendar' },
          { label: 'Annual Corporate Meetings', path: '/events', fragment: 'corporate-meeting' },


        ]
      },
      {
        label: 'Programs',
        path: '/programs',
        children: [
          { label: 'Overview', path: '/programs', fragment: 'programs' },
          { label: 'Youth Sponsorship', path: '/programs', fragment: 'youth-sponsorship' },
          { label: 'Community Involvement', path: '/programs', fragment: 'community' }
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
          { label: 'Overview', path: '/scholarship', fragment: 'scholarship' },
          { label: 'Application and Requirements', path: '/scholarship', fragment: 'application' },
          { label: 'Education Grant Program', path: '/scholarship', fragment: 'grants' },
          { label: 'Giving', path: '/scholarship', fragment: 'giving' },
          { label: 'Foundation FAQs', path: '/scholarship', fragment: 'faq' }
        ]
      },
      {
        label: 'Membership',
        path: '/become-a-member',
        children: [
          { label: 'Become a Member', path: '/become-a-member', fragment: 'becomemember' },
          { label: 'Sign Up', path: '/become-a-member', fragment: 'signup' },
          { label: 'Refer a Friend', path: '/membership/refer-friend' },
          { label: 'Perkspot', path: '/membership/perkspot' }
        ]
      },
      {
        label: 'About Us',
        path: '/about-us',
        children: [
          { label: 'Leadership', path: '/about-us', fragment: 'leadership' },
          { label: 'Council Directory', path: '/about-us', fragment: 'council-directory' },
          { label: 'Library', path: '/about-us', fragment: 'library' },
          { label: 'Bylaws and Financial', path: '/about-us', fragment: 'bylaws' },
          { label: 'Meet the Staff', path: '/about-us', fragment: 'staff' },
          { label: 'Careers', path: '/about-us', fragment: 'careers' }
        ]
      },
      {
        label: 'My Account',
        path: '/account/dashboard',
        children: [
          { label: 'Dashboard', path: '/account/dashboard' },
          { label: 'Festas', path: '/account/festas' },
          { label: 'Submit a Festa', path: '/account/festa-submit' },
          { label: 'Forms', path: '/account/forms' },
          { label: 'Council Tools', path: '/account/council' },
          { label: 'Profile', path: '/account/profile' }
        ]
      }
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
