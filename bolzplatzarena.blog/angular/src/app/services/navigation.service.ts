import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, filter, first, switchMap } from 'rxjs/operators';
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
      this.update();
      return sitemap;
    }

    const remoteSitemap = await this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).toPromise();
    if (remoteSitemap) {
      void this.offline.updateSitemap(remoteSitemap);
    }
    return remoteSitemap;
  }

  private update(): void {
    void this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).pipe(
      catchError(error => of(undefined)),
      first(),
      filter(data => !!data),
      switchMap(remoteSitemap => this.offline.updateSitemap(remoteSitemap !)),
    ).toPromise();
  }
}
