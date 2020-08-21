import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppStorageService } from 'src/app/core/service/app-storage.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { Menu } from 'src/app/shared/menu/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title = 'Application CE';
  menu = new Array<Menu>();
  access$: Promise<any>;
  droit: any;
  constructor(
    private translate: TranslateService,
    private route: Router,
    private loginService: LoginService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.getMenuItem('menu.vente');
    this.getMenuItem('menu.administration');
    this.getMenuItem('menu.edition');
    this.getMenuItem('menu.traitement');
  }

  hasAccess(item: Menu): boolean {
    this.droit = this.storage.getData('user');
    if (this.droit === JSON.stringify(item.acces)) {
      return true;
    }
    return this.droit === JSON.stringify('A'.toString());
  }

  isUserConnected(): boolean {
    const user = this.storage.getData('user');
    return !(user === null);
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
}
