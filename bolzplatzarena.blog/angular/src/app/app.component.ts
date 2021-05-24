import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly versionUpdate = new BehaviorSubject(false);

  constructor(update: SwUpdate) {
    update.available.subscribe(() => {
      update.activateUpdate().then(() => this.versionUpdate.next(true));
    });
    timer(0, 5 * 60 * 1000).pipe(
      filter(() => update.isEnabled),
      switchMap(() => update.checkForUpdate()),
    ).subscribe();
  }

  reload(): void {
    window.location.reload();
  }
}
