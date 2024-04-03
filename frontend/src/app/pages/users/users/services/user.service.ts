import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../classes/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }

  getUser(userId:number):Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`)
  }

  createUser(user:User) {
    return this.http.post(`${environment.apiUrl}/users`,user)
  }

  updateUser(id: number,user:User) {
    return this.http.put(`${environment.apiUrl}/users/${id}`,user)
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
  }
}
