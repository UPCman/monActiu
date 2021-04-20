import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

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
import { DisclaimerDialog } from './components/dialogs/disclaimer/disclaimer_dialog.component';
import { EmailSendDialog } from './components/dialogs/email_send_dialog/email_send_dialog.component';
import { EmailErrorDialog } from './components/dialogs/email_error/email_error_dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    UnderConstructionDialog,
    DisclaimerDialog,
    EmailSendDialog,
    EmailErrorDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    HammerModule,
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
