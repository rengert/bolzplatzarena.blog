import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { PageType } from '../../models/page-type.enum';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationOpen = signal(false);
  readonly title: Signal<string | undefined>;

  constructor(private readonly content: ContentService, router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.navigationOpen.set(false));
    this.title = toSignal(this.content.data$.pipe(
      map(data => (data.page?.type === PageType.Post)
        ? undefined
        : data.page?.title,
      ),
    ));
  }

  toggleNavigation() {
    this.navigationOpen.update(open => !open);
  }
}
