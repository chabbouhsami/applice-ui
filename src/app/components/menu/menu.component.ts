import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from 'src/app/core/service/state.service';
import { Menu } from 'src/app/shared/menu/menu';
import { LoginService } from 'src/app/core/services/login/login.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title = 'Application CE';
  menu = new Array<Menu>();
  droit: any;
  constructor(
    private translate: TranslateService,
    private route: Router,
    private appState: StateService,
    private loginService: LoginService
  ) {
    appState.event.subscribe((data) => {
      this.droit = data;
    });
  }

  hasAccess(item: Menu): boolean {
    if (this.droit === item.acces) {
      return true;
    }
    return this.droit === 'A';
  }

  isUserConnected(): boolean {
    console.log(sessionStorage.getItem('user'));
    const user = sessionStorage.getItem('user');
    return !(user === null);
  }

  ngOnInit(): void {
    this.getMenuItem('menu.vente');
    this.getMenuItem('menu.administration');
    this.getMenuItem('menu.edition');
    this.getMenuItem('menu.traitement');
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
