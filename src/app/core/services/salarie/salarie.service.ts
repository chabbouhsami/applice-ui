import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Salarie } from 'src/app/models/salarie/salarie';
import { environment } from 'src/environments/environment';
import { SalarieAdapter } from 'src/app/core/services/adapter/salarie/salarie.adapter';

@Injectable({
  providedIn: 'root',
})
export class SalarieService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'salarie/';

  constructor(private http: HttpClient, private adapter: SalarieAdapter) {}

  loadAll(): Promise<Salarie[]> {
    return this.http
      .get<Salarie[]>(this.baseUrl + 'searchAll', this.optionRequete)
      .pipe(
        map((response) => {
          const salaries = response.map((data) => this.adapter.adapt(data));
          return salaries;
        })
      )
      .toPromise();
  }

  getAll(): Observable<Salarie[]> {
    return this.http.get<Salarie[]>(
      this.baseUrl + 'searchAll',
      this.optionRequete
    );
  }

  saveSalarie(entity: Salarie): Observable<Salarie> {
    return this.http.post<Salarie>(this.baseUrl, entity, this.optionRequete);
  }

  updateSalarie(entity: Salarie): Observable<Salarie> {
    return this.http.patch<Salarie>(
      this.baseUrl + entity.code,
      entity,
      this.optionRequete
    );
  }
}
