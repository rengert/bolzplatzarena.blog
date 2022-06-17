import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderBy } from 'lodash-es';
import { firstValueFrom, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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
      return orderBy(sitemap, item => item.sortOrder);
    }
    const remoteSitemap = await firstValueFrom(this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).pipe(
      catchError(() => of(undefined)),
    ));
    if (remoteSitemap) {
      void this.offline.updateSitemap(remoteSitemap);
    }
    return orderBy(remoteSitemap ?? [], item => item.sortOrder);
  }

  private update(): void {
    void firstValueFrom(this.http.get<Page[]>(`${environment.apiUrl}/api/sitemap`).pipe(
      catchError(() => of([])),
      switchMap(remoteSitemap => this.offline.updateSitemap(remoteSitemap)),
    ));
  }
}
