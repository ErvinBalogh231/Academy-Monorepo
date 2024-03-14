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
}
