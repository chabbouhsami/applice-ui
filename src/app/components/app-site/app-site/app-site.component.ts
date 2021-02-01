import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-site',
  templateUrl: './app-site.component.html',
  styleUrls: ['./app-site.component.scss'],
})
export class AppSiteComponent implements OnInit {
  title = 'applice-ui';

  constructor(
    public translate: TranslateService,
    private adapter: DateAdapter<any>
  ) {
    adapter.setLocale('fr');
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  ngOnInit(): void {}
}
