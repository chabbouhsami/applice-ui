import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Approvisionnement } from 'src/app/models/approvisionnement/approvisionnement';

@Injectable({
  providedIn: 'root',
})
export class ApprovisionnementService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' POST, GET, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'approvisionnement/';

  constructor(private http: HttpClient) {}

  saveEntity(entity: Approvisionnement): Observable<Approvisionnement> {
    return this.http.post<Approvisionnement>(
      this.baseUrl,
      entity,
      this.optionRequete
    );
  }

  getStock(code: number): Observable<Approvisionnement> {
    return this.http.get<Approvisionnement>(this.baseUrl + code);
  }
}
