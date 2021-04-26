import { Component, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FULL_CONTACT_PHONE, Language, MainRoute } from './constants/global';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UnderConstructionDialog } from './components/dialogs/under_construction/under_construction_dialog.component';
import { DisclaimerDialog } from './components/dialogs/disclaimer/disclaimer_dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Close Under close dialog on press 'C'
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode === 67 && this._underConstructionDialogRef !== null) {
      this._underConstructionDialogRef.close();
    }
  }

  // To use enums on template
  public MainRoute = MainRoute;
  public Language = Language;

  // language: current language
  public language: Language = Language.CATALAN;

  // activeRoute: current route
  public activeRoute: MainRoute = null;

  // isLanguageSelectorOpen: To manage language selector logic
  public isLanguageSelectorOpen: boolean = false;

  // isSideMenuOpen: Flag to display the side menu
  public isSideMenuOpen: boolean = false;

  // underConstructionDialogRef: Under construction dialog reference
  private _underConstructionDialogRef = null;

  // disclaimerDialogRef: Disclaimer dialog reference
  private _disclaimerDialogRef = null;

  constructor (private _translate: TranslateService,
               private _router: Router,
               private _dialog: MatDialog) {
    this._translate.setDefaultLang (this.language);
    this._translate.use (this.language);

    this._router.events.subscribe ((val: any) => {
      if (val.hasOwnProperty ('url')) {
        this.isLanguageSelectorOpen = false;
        this.isSideMenuOpen = false;
        this.activeRoute = val.url.replace ('/', '');
        // console.log ("[AppComponent] Route:", val.url);
      }
    });

    // Open under construction dialog
    // this.openUnderConstructionDialog();
  }

  public toggleOptions () {
    this.isLanguageSelectorOpen = !this.isLanguageSelectorOpen;
  }

  public selectLanguage (language: Language) {
    this.isLanguageSelectorOpen = false;
    this.language = language;
    this._translate.use (language);
    this.isSideMenuOpen = false;
  }

  public openWhatsapp () {
    if (this.isMobile()) {
      window.document.location.href = 'https://api.whatsapp.com/send?phone=' + FULL_CONTACT_PHONE;
    } else {
      window.open ('https://web.whatsapp.com/send?phone=' + FULL_CONTACT_PHONE, '_blank');
    }
  }

  public openInstagram () {
    window.open ('https://www.instagram.com/monactiufisioterapia/', '_blank');
  }

  public toggleSideMenu () {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  public openSideMenu () {
    this.isSideMenuOpen = true;
  }

  public closeSideMenu () {
    this.isSideMenuOpen = false;
  }

  public openUnderConstructionDialog () {
    this._underConstructionDialogRef = this._dialog.open (UnderConstructionDialog, {
      panelClass: 'theme-dialog',
      disableClose: true
    });
  }

  public openDisclaimer () {
    this._disclaimerDialogRef = this._dialog.open (DisclaimerDialog, {
      panelClass: 'theme-dialog',
    });
  }

  private isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test (navigator.userAgent)) {
      return true;
    }
    else {
      return false;
    }
  }
}
