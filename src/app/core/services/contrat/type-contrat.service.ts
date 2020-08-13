import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TypeContrat } from 'src/app/models/contrat/type-contrat';

@Injectable({
  providedIn: 'root',
})
export class TypeContratService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'typeContrat/';

  constructor(private http: HttpClient) {}

  loadContrats(): Observable<TypeContrat[]> {
    return this.http.get<TypeContrat[]>(
      this.baseUrl + 'searchAll',
      this.optionRequete
    );
  }

  saveContrat(user: TypeContrat): Observable<TypeContrat> {
    return this.http.post<TypeContrat>(this.baseUrl, user, this.optionRequete);
  }

  deleteContrat(user: TypeContrat): Observable<TypeContrat> {
    return this.http.delete<TypeContrat>(
      this.baseUrl + user.code,
      this.optionRequete
    );
  }

  updateContrat(user: TypeContrat): Observable<TypeContrat> {
    return this.http.patch<TypeContrat>(
      this.baseUrl + user.code,
      user,
      this.optionRequete
    );
  }
}
