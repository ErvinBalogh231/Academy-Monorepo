import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Badge} from "../classes/Badge";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private httpClient: HttpClient) { }

  getBadges(): Observable<Badge[]> {
    return this.httpClient.get<Badge[]>(`${environment.apiUrl}/badges`)
  }
}
