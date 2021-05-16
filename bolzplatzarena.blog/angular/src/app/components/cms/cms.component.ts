import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    private readonly title: Title,
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

    const url = document.URL;
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'keywords', content: page.keywords });
    this.meta.updateTag({ name: 'robots', content: page.robots });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: page.description });
    this.meta.updateTag({ property: 'og-title', content: page.metaTitle ?? page.title });
    this.meta.updateTag({ property: 'og-url', content: url });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: url });
    this.meta.updateTag({ property: 'twitter:title', content: page.metaTitle ?? page.title });
    this.meta.updateTag({ property: 'twitter:description', content: page.description });

    this.title.setTitle(page.title);
  }

  private emptyMeta(): void {
    this.meta.updateTag({ name: 'description', content: '' });
    this.meta.updateTag({ name: 'keywords', content: '' });
    this.meta.updateTag({ name: 'robots', content: 'follow,no-index' });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: '' });
    this.meta.updateTag({ property: 'og-title', content: '' });
    this.meta.updateTag({ property: 'og-url', content: '' });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: '' });
    this.meta.updateTag({ property: 'twitter:title', content: '' });
    this.meta.updateTag({ property: 'twitter:description', content: '' });

    this.title.setTitle('Hier gibt es scheinbar gar nicht so viel zu sehen.');
  }
}
