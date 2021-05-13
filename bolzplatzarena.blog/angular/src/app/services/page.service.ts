import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { OfflineStorageService } from './offline-storage.service';

@Injectable({ providedIn: 'root' })
export class PageService {
  constructor(
    private readonly http: HttpClient,
    private readonly pageStorage: OfflineStorageService,
  ) {
  }

  async bySlug(slug: string): Promise<Page | undefined> {
    const page = await this.pageStorage.pageBySlug(slug);
    if (page) {
      return page;
    }
    const remotePage = await this.http.get<Page>(`${environment.apiUrl}/api/byslug${slug}`)
      .pipe(catchError(error => of(undefined)), first()).toPromise();
    if (remotePage) {
      void this.pageStorage.addPage(remotePage);
    }
    return remotePage;
  }
}
