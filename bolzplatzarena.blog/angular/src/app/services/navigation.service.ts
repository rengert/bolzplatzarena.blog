import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { OfflineStorageService } from './offline-storage.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private readonly http: HttpClient,
    private readonly offline: OfflineStorageService,
  ) {
  }

  async get(): Promise<Page[]> {
    const sitemap = await this.offline.sitemap();
    if (sitemap.length) {
      return sitemap;
    }

    const remoteSitemap = await this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).toPromise();
    if (remoteSitemap) {
      void this.offline.updateSitemap(remoteSitemap);
    }
    return remoteSitemap;
  }
}
