import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { StateService } from '../../service/state.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: User;
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'login/';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.optionRequete);
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.clear();
  }
}
