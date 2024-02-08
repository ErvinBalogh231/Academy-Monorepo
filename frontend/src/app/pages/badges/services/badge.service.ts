import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Badge } from '../classes/badge';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  constructor(private httpClient: HttpClient) { }

  getBadges(): Observable<Badge[]> {
    return this.httpClient.get<Badge[]>(`${environment.apiUrl}/badges`);
  }
}
