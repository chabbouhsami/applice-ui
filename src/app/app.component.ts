import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'applice-ui';

  constructor(
    public translate: TranslateService,
    private adapter: DateAdapter<any>
  ) {
    adapter.setLocale('fr');
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}
