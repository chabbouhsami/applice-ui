import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Rg } from 'src/app/models/rg/rg';

@Injectable({
  providedIn: 'root',
})
export class RgService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'rg/';

  constructor(private http: HttpClient) {}

  getRg(): Observable<Rg> {
    return this.http.get<Rg>(this.baseUrl, this.optionRequete);
  }

  saveOrUpdateRg(rg: Rg): Observable<Rg> {
    return this.http.post<Rg>(this.baseUrl, rg, this.optionRequete);
  }
}
