import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Page } from '../../models/page';
import { PageType } from '../../models/page-type.enum';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsComponent implements OnInit {
  data$: Observable<Page | undefined>;

  readonly PageType = PageType;

  constructor(
    private readonly meta: Meta,
    page: PageService,
    router: Router,
  ) {
    this.data$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      startWith(router.url),
      switchMap(url => page.bySlug(url)),
      tap(page => this.updateMeta(page)),
    );
  }

  ngOnInit(): void {
  };

  private updateMeta(page: Page | undefined): void {
    if (!page) {
      return;
    }
    this.meta.updateTag({ name: 'description', content: page.title });
    this.meta.updateTag({ name: 'og-title', content: page.title });
  }
}
