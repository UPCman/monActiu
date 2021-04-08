import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/00_home/home.component';
import { AboutComponent } from './components/01_about/about.component';
import { TreatmentsComponent } from './components/02_treatments/treatments.component';
import { FacilitiesComponent } from './components/03_facilities/facilities.component';
import { ContactComponent } from './components/04_contact/contact.component';
import { PricingComponent } from './components/05_pricing/pricing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UnderConstructionDialog } from './components/dialogs/under_construction/under_construction_dialog.component';

export function createTranslateLoader (http: HttpClient) {
  return new TranslateHttpLoader (http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TreatmentsComponent,
    FacilitiesComponent,
    ContactComponent,
    PricingComponent,
    UnderConstructionDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule.forRoot ({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }

    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
