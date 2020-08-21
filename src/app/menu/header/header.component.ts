import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  title = 'Application CE';

  constructor() {}

  ngOnInit(): void {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
