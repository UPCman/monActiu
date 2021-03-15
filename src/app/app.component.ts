import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, MainRoute } from './constants/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // showLanguage: Indicates if language options must be shown
  public showLanguage: boolean = false;

  // To use enums on template
  public MainRoute = MainRoute;
  public Language = Language;

  // language: current language
  public language: Language = Language.CATALAN;

  // activeRoute: current route
  public activeRoute: MainRoute = null;

  constructor (private _translate: TranslateService,
               private _router: Router) {
    this._translate.setDefaultLang (this.language);
    this._translate.use (this.language);

    this._router.events.subscribe ((val: any) => {
      if (val.hasOwnProperty ('url')) {
        this.activeRoute = val.url.replace ('/', '');
        // console.log ("[AppComponent] Route:", val.url);
      }
    });
  }

  public toggleOptions () {
    this.showLanguage = !this.showLanguage;
  }

  public selectLanguage (language: Language) {
    this.showLanguage = false;
    this.language = language;
    this._translate.use (language);
  }

}
