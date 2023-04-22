import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Page } from '../models/page';
import { MetaDataService } from './meta-data.service';
import { PageService } from './page.service';

export interface Content {
  page: Page | undefined;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly data$: Observable<Content>;

  private readonly ignorePatterns = ['/manager', '/nonogramm'];

  constructor(
    metaData: MetaDataService,
    page: PageService,
    router: Router,
  ) {
    this.data$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      filter(url => !this.ignorePatterns.some(pattern => url.startsWith(pattern))),
      switchMap(url => page.bySlug(url)),
      tap(page => metaData.update(page)),
      map(page => ({ page })),
      shareReplay(1),
    );
  }
}
