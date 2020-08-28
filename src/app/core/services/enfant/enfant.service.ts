import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Enfant } from 'src/app/models/enfant/enfant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'enfants/';

  constructor(private http: HttpClient) {}

  getAllByParent(code: number): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(
      this.baseUrl + 'salarie/' + code,
      this.optionRequete
    );
  }
}
