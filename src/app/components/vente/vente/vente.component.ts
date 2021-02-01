import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { EnfantService } from 'src/app/core/services/enfant/enfant.service';
import { SalarieService } from 'src/app/core/services/salarie/salarie.service';
import { AppStorageService } from 'src/app/core/services/storage/app-storage.service';
import { VenteService } from 'src/app/core/services/vente/vente.service';
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
  ventes$: Observable<Vente[]>;
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
    private enfantsSerice: EnfantService,
    private articleService: ArticleService,
    private venteService: VenteService,
    private store: AppStorageService
  ) {}

  ngOnInit(): void {
    this.salaries$ = this.salarieService.getAll();
    this.articles$ = this.articleService.loadAll();
    this.entity.vendeur = JSON.parse(this.store.getData('user'));
  }

  onSalarieChange(event): void {
    if (event) {
      this.isArticle = false;
      this.enfantsSerice.getAllByParent(event.code).subscribe((enfants) => {
        if (enfants) {
          this.nbEnfants = enfants.length;
        } else {
          this.nbEnfants = 0;
        }
      });
      this.ventes$ = this.venteService.loadAll(event.code);
    }
  }

  firePaymentDone(event): void {
    this.entity = new Vente();
    this.isArticle = false;
    this.isVente = false;
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
    this.updateVente();
    Object.assign(vente, this.entity);
    this.cart$.cart.ventes.push(vente);
    this.cart$.cart.total += Number(this.entity.montantSigne);
    this.resetEntity(false);
  }

  updateVente(): void {
    const signe = this.entity.typeVente === 'A' ? '-' : '+';
    this.entity.quantiteSigne = signe + this.entity.nombre;
    this.entity.montantSigne = signe + this.entity.montant;
  }

  resetEntity(totally: boolean): void {
    if (totally) {
      Object.assign(this.entity, new Vente());
      return;
    }
    this.entity.article = null;
    this.entity.nombre = null;
    this.entity.montant = null;
    this.entity.commentaire = '';
    this.entity.typeVente = '';
  }
  save(gorm: NgForm): void {}
}
