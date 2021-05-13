import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private readonly http: HttpClient) {
  }

  get(): Promise<Page[]> {
    return this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).toPromise();
  }
}
