import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'applice-ui';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}