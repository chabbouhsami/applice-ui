import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/core/services/login/login.service';
import { AppStorageService } from 'src/app/core/services/storage/app-storage.service';
import { User } from 'src/app/models/user/user';
import { Menu } from 'src/app/shared/menu/menu';

@Component({
  selector: 'app-app-site',
  templateUrl: './app-site.component.html',
  styleUrls: ['./app-site.component.scss'],
})
export class AppSiteComponent implements OnInit {
  menu = new Array<Menu>();
  access$: Promise<any>;
  droit: any;

  constructor(
    public translate: TranslateService,
    private adapter: DateAdapter<any>,
    private storage: AppStorageService,
    private route: Router,
    private loginService: LoginService
  ) {
    adapter.setLocale('fr');
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  ngOnInit(): void {
    this.getMenuItem('menu.vente');
    this.getMenuItem('menu.administration');
    this.getMenuItem('menu.edition');
    this.getMenuItem('menu.traitement');
  }

  hasAccess(item: Menu): boolean {
    const user: User = JSON.parse(this.storage.getData('user'));
    this.droit = user.right;
    if (this.droit === item.acces) {
      return true;
    }
    return this.droit === 'A'.toString();
  }

  getMenuItem(translateLabel: string): Array<Menu> {
    const result = new Array<Menu>();
    this.translate.get(translateLabel).forEach((translation) => {
      this.menu.push(translation);
    });
    return result;
  }

  public logout(): void {
    this.droit = '';
    this.loginService.logout();
    this.route.navigate(['/']);
  }

  isUserConnected(): boolean {
    return this.loginService.isUserLoggedIn();
  }
}
