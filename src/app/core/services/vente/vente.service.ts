import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vente } from 'src/app/models/vente/vente';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'vente/';

  constructor(private http: HttpClient) {}

  loadAll(code: number): Observable<Vente[]> {
    return this.http.get<Vente[]>(
      this.baseUrl + 'bySalarie/' + code,
      this.optionRequete
    );
  }

  saveVente(vente: Vente): void {
    this.http.post<Vente>(this.baseUrl, vente, this.optionRequete).subscribe();
  }
}
