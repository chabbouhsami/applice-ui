import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { AppStorageService } from 'src/app/core/services/storage/app-storage.service';
import { User } from 'src/app/models/user/user';
import { Menu } from 'src/app/shared/menu/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  @Input() menu: any;
  isUserConnected: Observable<boolean>;

  user: User;

  constructor(
    private translate: TranslateService,
    private service: LoginService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.service.loggedIn.subscribe({
      next: (event) => {
        this.isUserConnected = event;
        console.log(event);
      },
    });
  }

  hasAccess(item: Menu): boolean {
    const user: User = JSON.parse(this.storage.getData('user'));
    return user.right === item.acces || user.right === 'A';
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
