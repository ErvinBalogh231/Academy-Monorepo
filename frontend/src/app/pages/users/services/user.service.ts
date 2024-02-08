import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  createUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
