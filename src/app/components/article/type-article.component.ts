import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { TypeArticleService } from 'src/app/core/services/article/type-article.service';
import { TypeArticle } from 'src/app/models/article/type-article';

@Component({
  selector: 'app-type-article',
  templateUrl: './type-article.component.html',
  styleUrls: ['./type-article.component.scss'],
})
export class TypeArticleComponent implements OnInit {
  articles$: Observable<TypeArticle[]>;
  typeArticle: TypeArticle;
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  droits = [
    { id: 'A', value: 'Administrateur' },
    { id: 'V', value: 'Vendeur' },
  ];
  titleSaveOrUpdate: string;
  saveLabel: string;
  updateLabel: string;
  deleteLabel: string;

  constructor(
    private articleService: TypeArticleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.typeArticle = new TypeArticle();
    this.getArticles();
    this.translate.get('button.save').subscribe((translation) => {
      this.saveLabel = translation;
      this.actionButton = translation;
    });

    this.translate.get('button.update').subscribe((translation) => {
      this.updateLabel = translation;
    });

    this.translate.get('button.delete').subscribe((translation) => {
      this.deleteLabel = translation;
    });
  }

  async saveOrUpdateArticle(addArticleForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addArticleForm.valid) {
      this.buildMessageModal('Error in the form');
    }
    if (this.actionButton === this.saveLabel) {
      this.saveNewArticle(this.typeArticle);
    } else if (this.actionButton === this.updateLabel) {
      this.updateArticle(this.typeArticle);
    }
    this.displayMessageModal = true;
    this.typeArticle = Object.assign({}, new TypeArticle());
    this.actionButton = this.saveLabel;
    addArticleForm.reset();
    this.getArticles();
  }

  saveNewArticle(typeArticle: TypeArticle): void {
    this.articleService.saveArticle(typeArticle).subscribe(
      (result: TypeArticle) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeArticle data'
        );
      }
    );
  }

  getArticles(): void {
    this.articles$ = this.articleService.loadArticles();
  }

  setUpdateArticle(typeArticle: TypeArticle): void {
    this.titleSaveOrUpdate = 'Update Book Form';
    this.actionButton = this.updateLabel;
    this.typeArticle = Object.assign({}, typeArticle);
    this.displayMessageModal = false;
  }

  updateArticle(typeArticle: TypeArticle): void {
    this.articleService.updateArticle(typeArticle).subscribe(
      (result: TypeArticle) => {
        if (result.code) {
          this.buildMessageModal('Update operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeArticle data'
        );
      }
    );
  }

  deleteArticle(typeArticle: TypeArticle): void {
    this.articleService.deleteArticle(typeArticle).subscribe(
      (result: TypeArticle) => {
        if (result.code) {
          this.getArticles();
          this.buildMessageModal('Delete operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeArticle data'
        );
      }
    );
    this.getArticles();
  }

  clearForm(addBookForm: NgForm): void {
    addBookForm.form.reset();
    this.displayMessageModal = false;
  }

  buildMessageModal(msg: string): void {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }
}
