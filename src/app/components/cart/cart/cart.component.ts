import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart';
import { Vente } from 'src/app/models/vente/vente';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart = new Cart();
  total = 0;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  finishOrder(): void {}
}
