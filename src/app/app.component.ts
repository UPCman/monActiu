import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, MainRoute } from './constants/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monActiu';

  // To use enums on template
  public MainRoute = MainRoute;


  constructor (private _translate: TranslateService) {
    this._translate.setDefaultLang (Language.CATALAN);
    this._translate.use (Language.CATALAN);
  }
}
