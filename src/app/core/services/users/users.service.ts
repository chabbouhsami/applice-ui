import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
      'mon-entete-personnalise': 'maValeur',
    }),
  };
  baseUrl = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl + 'searchAll',
      this.optionRequete
    );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + 'login/',
      user,
      this.optionRequete
    );
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.optionRequete);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.baseUrl + user.code, this.optionRequete);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      this.baseUrl + user.code,
      user,
      this.optionRequete
    );
  }
}
