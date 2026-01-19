import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeDemoOne } from './demos/home-demo-one/home-demo-one';
import { HomeDemoTwo } from './demos/home-demo-two/home-demo-two';
import { HomeDemoThree } from './demos/home-demo-three/home-demo-three';
import { AboutPage } from './pages/about-page/about-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { ErrorPage } from './pages/error-page/error-page';
import { TestimonialsPage } from './pages/testimonials-page/testimonials-page';
import { AgentsPage } from './pages/agents-page/agents-page';
import { ServicesPage } from './pages/services-page/services-page';
import { ServiceDetailsPage } from './pages/service-details-page/service-details-page';
import { MyAccountPage } from './pages/my-account-page/my-account-page';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';
import { PricingPage } from './pages/pricing-page/pricing-page';
import { ClaimsPage } from './pages/claims-page/claims-page';
import { FaqPage } from './pages/faq-page/faq-page';
import { PrivacyPolicyPage } from './pages/privacy-policy-page/privacy-policy-page';
import { TermsConditionsPage } from './pages/terms-conditions-page/terms-conditions-page';
import { BusinessInsurancePage } from './pages/business-insurance-page/business-insurance-page';
import { HealthInsurancePage } from './pages/health-insurance-page/health-insurance-page';
import { LifeInsurancePage } from './pages/life-insurance-page/life-insurance-page';
import { CarInsurancePage } from './pages/car-insurance-page/car-insurance-page';
import { BlogGridPage } from './pages/blog-grid-page/blog-grid-page';
import { BlogRightSidebarPage } from './pages/blog-right-sidebar-page/blog-right-sidebar-page';
import { BlogDetailsPage } from './pages/blog-details-page/blog-details-page';
import { IconGalleryComponent } from './tools/font-awesome.component';
import { BootstrapIconGalleryComponent } from './tools/bootstrap-icons.component';
import { LincPage } from './pages/linc-page/linc-page';
import { PublicationsPage } from './pages/publications-page/publications-page';
import { EventsPage } from './pages/events-page/events-page';
import { SavingsPage } from './pages/savings-page/savings-page';
import { ProductsPage } from './pages/products-page/products-page';
import { ProgramsPage } from './pages/programs-page/programs-page';
import { ScholarshipPage } from './pages/scholarship-page/scholarship-page';
import { BecomeMemberPage } from './pages/become-member-page/become-member-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { AccountFormsPage } from './pages/account-forms-page/account-forms-page';
import { FestaSchedulePage } from './pages/festa-schedule-page/festa-schedule-page';
import { FestaFormPage } from './pages/festa-form-page/festa-form-page';
import { FestasPage } from './pages/festas-page/festas-page';
import { AccountFestasPage } from './pages/account-festas-page/account-festas-page';
import { AccountToolsPage } from './pages/account-tools-page/account-tools-page';
import { AccountProfilePage } from './pages/account-profile-page/account-profile-page';
import { CallbackPage } from './pages/callback-page/callback-page';
export const routes: Routes = [
    { path: '', component: HomeDemoOne },
    { path: 'index-2', component: HomeDemoTwo },
    { path: 'index-3', component: HomeDemoThree },
    { path: 'about-us', component: AboutPage },
    { path: 'testimonials', component: TestimonialsPage },
    { path: 'agents', component: AgentsPage },
    { path: 'services', component: ServicesPage },
    { path: 'service-details', component: ServiceDetailsPage },
    { path: 'pricing', component: PricingPage },
    { path: 'claims', component: ClaimsPage },
    { path: 'business-insurance', component: BusinessInsurancePage },
    { path: 'health-insurance', component: HealthInsurancePage },
    { path: 'life-insurance', component: LifeInsurancePage },
    { path: 'car-insurance', component: CarInsurancePage },
    { path: 'faq', component: FaqPage },
    { path: 'privacy-policy', component: PrivacyPolicyPage },
    { path: 'terms-conditions', component: TermsConditionsPage },
    { path: 'my-account', component: MyAccountPage },
    { path: 'forgot-password', component: ForgotPasswordPage },
    { path: 'blog-grid', component: BlogGridPage },
    { path: 'blog-right-sidebar', component: BlogRightSidebarPage },
    { path: 'blog-details', component: BlogDetailsPage },
    { path: 'publications', component: PublicationsPage },
    { path: 'newsletters', component: PublicationsPage },
    { path: 'contact-us', component: ContactPage },
    { path: 'linc', component: LincPage },
    { path: 'icons/font-awesome', component: IconGalleryComponent },
    { path: 'icons/bootstrap', component: BootstrapIconGalleryComponent },
    { path: 'events', component: EventsPage },
    { path: 'savings', component: SavingsPage },
    { path: 'products', component: ProductsPage },
    { path: 'products/life-insurance', component: LifeInsurancePage },
    { path: 'products/savings', component: SavingsPage },
    { path: 'programs', component: ProgramsPage },
    { path: 'scholarship', component: ScholarshipPage },
    { path: 'become-a-member', component: BecomeMemberPage },
    { path: 'festas', component: FestasPage },
    { path: 'festa-schedule', component: FestaSchedulePage },
    // Auth callback route
    { path: 'callback', component: CallbackPage },
    // Account routes (protected)
    { path: 'account/dashboard', component: DashboardPage, canActivate: [authGuard] },
    { path: 'account/tools', component: AccountToolsPage, canActivate: [authGuard] },
    { path: 'account/forms', component: AccountFormsPage, canActivate: [authGuard] },
    { path: 'account/festas', component: AccountFestasPage, canActivate: [authGuard] },
    { path: 'account/festa-submit', component: FestaFormPage, canActivate: [authGuard] },
    { path: 'account/council', component: DashboardPage, canActivate: [authGuard] }, // Placeholder - will be replaced
    { path: 'account/profile', component: AccountProfilePage, canActivate: [authGuard] },
    { path: '**', component: ErrorPage } // This line will remain down from the whole component list
];