import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { AppStorageService } from 'src/app/core/services/storage/app-storage.service';
import { User } from 'src/app/models/user/user';
import { Menu } from 'src/app/shared/menu/menu';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Input() menu: any;
  user: User;
  isUserConnected: Observable<boolean>;

  constructor(
    private service: LoginService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.service.loggedIn.subscribe({
      next: (event) => {
        this.user = JSON.parse(this.storage.getData('user'));

        this.isUserConnected = event;
        console.log(event);
      },
    });
  }

  hasAccess(item: Menu): boolean {
    const user: User = JSON.parse(this.storage.getData('user'));
    return user.right === item.acces || user.right === 'A';
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
