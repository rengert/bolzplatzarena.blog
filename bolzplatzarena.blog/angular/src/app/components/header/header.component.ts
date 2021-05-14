import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  navigationOpen = false;

  constructor(router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.navigationOpen = false);
  }
}
