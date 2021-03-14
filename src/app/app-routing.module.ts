import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRoute } from './constants/global';
import { HomeComponent } from './components/00_home/home.component';
import { AboutComponent } from './components/01_about/about.component';
import { TreatmentsComponent } from './components/02_treatments/treatments.component';
import { FacilitiesComponent } from './components/03_facilities/facilities.component';
import { PricingComponent } from './components/05_pricing/pricing.component';
import { ContactComponent } from './components/04_contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: MainRoute.HOME, component: HomeComponent },
  { path: MainRoute.ABOUT, component: AboutComponent },
  { path: MainRoute.TREATMENTS, component: TreatmentsComponent },
  { path: MainRoute.FACILITIES, component: FacilitiesComponent },
  { path: MainRoute.CONTACT, component: ContactComponent },
  { path: MainRoute.PRICING, component: PricingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
