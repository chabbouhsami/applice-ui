import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { TypeArticle } from 'src/app/models/article/type-article';
import { TypeArticleService } from 'src/app/core/services/article/type/type-article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles$: Observable<Article[]>;
  types$: Observable<TypeArticle[]>;
  article: Article;
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;

  titleSaveOrUpdate: string;
  saveLabel: string;
  updateLabel: string;

  constructor(
    private articleService: ArticleService,
    private typeArticleService: TypeArticleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.article = new Article();
    this.getArticles();
    this.translate.get('button.save').subscribe((translation) => {
      this.saveLabel = translation;
      this.actionButton = translation;
    });

    this.translate.get('button.update').subscribe((translation) => {
      this.updateLabel = translation;
    });
  }

  async saveOrUpdateArticle(addArticleForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addArticleForm.valid) {
      this.buildMessageModal('Error in the form');
    }
    if (this.actionButton === this.saveLabel) {
      this.saveNewArticle(this.article);
    } else if (this.actionButton === this.updateLabel) {
      this.updateArticle(this.article);
    }
    this.displayMessageModal = true;
    this.article = Object.assign({}, new Article());
    this.actionButton = this.saveLabel;
    addArticleForm.reset();
    this.getArticles();
  }

  saveNewArticle(article: Article): void {
    this.articleService.saveArticle(article).subscribe(
      (result: Article) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the article data');
      }
    );
  }

  getArticles(): void {
    this.articles$ = this.articleService.loadAll();
    this.types$ = this.typeArticleService.loadAll();
  }

  setUpdateArticle(article: Article): void {
    this.titleSaveOrUpdate = 'Update Book Form';
    this.actionButton = this.updateLabel;
    this.article = Object.assign({}, article);
    this.displayMessageModal = false;
  }

  updateArticle(article: Article): void {
    this.articleService.updateArticle(article).subscribe(
      (result: Article) => {
        if (result.code) {
          this.buildMessageModal('Update operation correctly done');
          this.displayMessageModal = true;
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
