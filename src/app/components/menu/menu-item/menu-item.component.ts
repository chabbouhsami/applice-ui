import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Menu } from 'src/app/shared/menu/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() items: Array<Menu>;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
  constructor() {}

  ngOnInit(): void {}
}
