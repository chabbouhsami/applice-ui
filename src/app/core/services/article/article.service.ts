import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'article/';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<Article[]> {
    return this.http.get<Article[]>(
      this.baseUrl + 'searchAll',
      this.optionRequete
    );
  }

  loadStockable(): Observable<Article[]> {
    return this.http.get<Article[]>(
      this.baseUrl + 'getStockable',
      this.optionRequete
    );
  }

  saveArticle(entity: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, entity, this.optionRequete);
  }

  updateArticle(entity: Article): Observable<Article> {
    return this.http.patch<Article>(
      this.baseUrl + entity.code,
      entity,
      this.optionRequete
    );
  }
}
