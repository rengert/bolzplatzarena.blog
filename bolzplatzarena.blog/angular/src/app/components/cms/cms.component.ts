import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class CmsComponent {
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

  private updateMeta(page: Page | undefined): void {
    if (!page) {
      return;
    }

    const url = document.URL; //window.location.pathname;
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'keywords', content: page.keywords });
    this.meta.updateTag({ name: 'robots', content: page.robots });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: page.description });
    this.meta.updateTag({ property: 'og-title', content: page.title });
    this.meta.updateTag({ property: 'og-url', content: url });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: url });
    this.meta.updateTag({ property: 'twitter:title', content: page.title });
    this.meta.updateTag({ property: 'twitter:description', content: page.description });
  }
}
