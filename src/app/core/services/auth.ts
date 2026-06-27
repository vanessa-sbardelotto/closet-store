import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://closet-store-f3032-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

  login(email: string, password: string): Observable<boolean> {
  return this.http
    .get<User[] | { [key: string]: User }>(this.apiUrl)
    .pipe(
      map((data) => {
        const list: User[] = Array.isArray(data) ? data : Object.values(data);
        const user = list.find(
          (u: User) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
        throw new Error('Usuário inválido');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    if (!user) return '';
    return JSON.parse(user).name;
  }
}