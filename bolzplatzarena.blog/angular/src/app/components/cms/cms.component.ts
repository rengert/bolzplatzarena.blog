import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Page } from '../../models/page';
import { PageType } from '../../models/page-type.enum';
import { MetaDataService } from '../../services/meta-data.service';
import { PageService } from '../../services/page.service';

interface Content {
  page?: Page;
}

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsComponent {
  data$: Observable<Content>;

  readonly PageType = PageType;

  constructor(
    metaData: MetaDataService,
    page: PageService,
    router: Router,
  ) {
    this.data$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      startWith(router.url),
      switchMap(url => page.bySlug(url)),
      tap(page => metaData.update(page)),
      map(page => ({ page })),
    );
  }
}
