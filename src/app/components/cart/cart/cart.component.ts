import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VenteService } from 'src/app/core/services/vente/vente.service';
import { Cart } from 'src/app/models/cart/cart';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { Article } from 'src/app/models/article/article';
import { Vente } from 'src/app/models/vente/vente';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart = new Cart();
  @Output()
  paymentDone = new EventEmitter<boolean>();

  constructor(
    private venteService: VenteService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  finishOrder(): void {
    this.cart.ventes.forEach((vente) => {
      this.updateArticle(vente.article, vente.quantiteSigne);
      this.updateVente(vente);
    });
    this.cart = new Cart();
    this.paymentDone.emit(true);
  }

  updateVente(vente: Vente): void {
    vente.date = new Date();
    vente.subvention = vente.salarie.plafond
      ? vente.article.subventionSupPlafond
      : vente.article.subventionInfPlafond;
    vente.venteAnne = vente.date.getFullYear().toString();
    vente.venteMois = vente.date.getMonth();
    this.venteService.saveVente(vente);
  }

  updateArticle(article: Article, nombre: string): void {
    article.quantiteStock -= Number(nombre);
    this.articleService.updateArticle(article).subscribe();
  }
}
