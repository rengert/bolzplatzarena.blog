import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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

  async getArchive(): Promise<Teaser[]> {
    const page = await this.bySlug('');
    return page?.posts ?? [];
  }

  async bySlug(slug: string): Promise<Page | undefined> {
    const page = await this.pageStorage.getPageBySlug(slug);
    if (page) {
      this.update(slug);
      return page;
    }
    const remotePage = await firstValueFrom(this.http.get<Page>(`${environment.apiUrl}/api/byslug${slug}`)
      .pipe(catchError(() => of(undefined))));
    if (remotePage) {
      void this.pageStorage.addPage(remotePage);
    }
    return remotePage;
  }

  private update(slug: string): void {
    void firstValueFrom(this.http.get<Page>(`${environment.apiUrl}/api/byslug${slug}`).pipe(
      catchError(() => of(undefined)),
      switchMap(page => this.pageStorage.addPage(page)),
    ));
  }
}
