import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, filter, first, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { Teaser } from '../models/teaser';
import { OfflineStorageService } from './offline-storage.service';

@Injectable({ providedIn: 'root' })
export class PageService {
  constructor(
    private readonly http: HttpClient,
    private readonly pageStorage: OfflineStorageService,
  ) {
  }

  async archive(): Promise<Teaser[]> {
    const page = await this.bySlug('');
    return page?.posts ?? [];
  }

  async bySlug(slug: string): Promise<Page | undefined> {
    const page = await this.pageStorage.pageBySlug(slug);
    if (page) {
      this.update(slug);
      return page;
    }
    const remotePage = await this.http.get<Page>(`${environment.apiUrl}/api/byslug${slug}`)
      .pipe(catchError(() => of(undefined)), first()).toPromise();
    if (remotePage) {
      void this.pageStorage.addPage(remotePage);
    }
    return remotePage;
  }

  private update(slug: string): void {
    void this.http.get<Page>(`${environment.apiUrl}/api/byslug${slug}`)
      .pipe(
        catchError(() => of(undefined)),
        first(),
        filter(page => !!page),
        switchMap(page => this.pageStorage.addPage(page !)),
      ).toPromise();
  }
}
