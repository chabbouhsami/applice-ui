import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TypeArticle } from 'src/app/models/article/type-article';

@Injectable({
  providedIn: 'root',
})
export class TypeArticleService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'article/type/';

  constructor(private http: HttpClient) {}

  loadArticles(): Observable<TypeArticle[]> {
    return this.http.get<TypeArticle[]>(
      this.baseUrl + 'searchAll',
      this.optionRequete
    );
  }

  saveArticle(entity: TypeArticle): Observable<TypeArticle> {
    return this.http.post<TypeArticle>(
      this.baseUrl,
      entity,
      this.optionRequete
    );
  }

  deleteArticle(entity: TypeArticle): Observable<TypeArticle> {
    return this.http.delete<TypeArticle>(
      this.baseUrl + entity.code,
      this.optionRequete
    );
  }

  updateArticle(entity: TypeArticle): Observable<TypeArticle> {
    return this.http.patch<TypeArticle>(
      this.baseUrl + entity.code,
      entity,
      this.optionRequete
    );
  }
}
