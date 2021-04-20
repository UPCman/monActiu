import { Component } from '@angular/core';
import { MainRoute } from '../../constants/global';


@Component({
  selector: 'home',
  templateUrl: './home.tpl.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // To use enums on template
  public MainRoute = MainRoute;
}
