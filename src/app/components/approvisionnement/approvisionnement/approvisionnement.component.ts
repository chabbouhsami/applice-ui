import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovisionnementService } from 'src/app/core/services/approvisionnement/approvisionnement.service';
import { Article } from 'src/app/models/article/article';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Approvisionnement } from 'src/app/models/approvisionnement/approvisionnement';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { AppStorageService } from 'src/app/core/services/storage/app-storage.service';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss'],
})
export class ApprovisionnementComponent implements OnInit {
  articles$: Observable<Article[]>;
  types = [
    { id: 'E', value: 'Entrée' },
    { id: 'S', value: 'Sortie' },
  ];
  approvisionnement: Approvisionnement = new Approvisionnement();
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  stock = 0;

  constructor(
    private service: ApprovisionnementService,
    private translate: TranslateService,
    private articleService: ArticleService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.translate.get('button.save').subscribe((translation) => {
      this.actionButton = translation;
    });
    this.articles$ = this.articleService.loadStockable();
  }
  onChange(event): void {
    if (event) {
      this.service.getStock(event.code).subscribe((appro) => {
        this.stock = appro.nombre;
      });
    } else {
      this.stock = 0;
    }
  }

  saveApprovisionnement(form: NgForm): void {
    if (!form.valid) {
      this.buildMessageModal('Error in the form');
    }
    this.updateApprovisionnement();
    this.saveNewApprovisionnement(this.approvisionnement);
    form.reset();
  }

  updateApprovisionnement(): void {
    const signe = this.approvisionnement.type === 'S' ? -1 : 1;

    this.approvisionnement.montantSigne =
      signe * this.approvisionnement.montantTotal;
    this.approvisionnement.nombre =
      Number(this.stock) + Number(signe * this.approvisionnement.quantite);
    this.approvisionnement.dateAppro = new Date();
    this.approvisionnement.user = JSON.parse(this.storage.getData('user'));
  }

  saveNewApprovisionnement(entity: Approvisionnement): void {
    this.service.saveEntity(entity).subscribe(
      (result: Approvisionnement) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the article data');
      }
    );
  }

  clearForm(addForm: NgForm): void {
    addForm.form.reset();
    this.displayMessageModal = false;
  }

  buildMessageModal(msg: string): void {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }
}
