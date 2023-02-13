import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageType } from '../../models/page-type.enum';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  navigationOpen = false;

  readonly title$: Observable<string | undefined>;

  constructor(content: ContentService, router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.navigationOpen = false);

    this.title$ = content.data$.pipe(
      map(data => (data.page?.type === PageType.Post)
        ? undefined
        : data.page?.title,
      ),
    );
  }
}
