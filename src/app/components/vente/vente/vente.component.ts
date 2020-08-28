import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { EnfantService } from 'src/app/core/services/enfant/enfant.service';
import { SalarieService } from 'src/app/core/services/salarie/salarie.service';
import { Article } from 'src/app/models/article/article';
import { Salarie } from 'src/app/models/salarie/salarie';
import { Vente } from 'src/app/models/vente/vente';
import { CartComponent } from '../../cart/cart/cart.component';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
})
export class VenteComponent implements OnInit {
  displayMessageModal: boolean;
  messageModal: string;
  entity = new Vente();
  salaries$: Observable<Salarie[]>;
  articles$: Observable<Article[]>;
  nbEnfants = 0;
  isVente = false;
  isArticle = false;
  @ViewChild(CartComponent)
  private cart$: CartComponent;

  typeVente = [
    { id: 'V', value: 'Vente' },
    { id: 'A', value: 'Avoir' },
  ];
  constructor(
    private salarieService: SalarieService,
    private translate: TranslateService,
    private enfantsSerice: EnfantService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.salaries$ = this.salarieService.getAll();
    this.articles$ = this.articleService.loadAll();
  }

  onSalarieChange(event): void {
    if (event) {
      this.enfantsSerice.getAllByParent(event.code).subscribe((enfants) => {
        if (enfants) {
          this.nbEnfants = enfants.length;
        } else {
          this.nbEnfants = 0;
        }
      });
    }
  }

  onArticleChange(event): void {
    if (event) {
      this.isArticle = true;
    }
  }

  calculMontant(): void {
    const prixUnitaire = this.entity.salarie.plafond
      ? Number(this.entity.article.prixSupPlafond)
      : Number(this.entity.article.prixInfPlafond);
    this.entity.montant = Number(this.entity.nombre) * prixUnitaire;
  }

  setDebutVente(): void {
    this.isVente = true;
  }

  addToCart(): void {
    this.isArticle = false;
    const vente = new Vente();
    Object.assign(vente, this.entity);
    this.cart$.cart.ventes.push(vente);
    this.cart$.total += this.entity.montant;
    this.entity.article = null;
    this.entity.nombre = null;
    this.entity.montant = null;
    this.entity.commentaire = '';
    this.entity.typeVente = '';
  }
  save(gorm: NgForm): void {}
}
