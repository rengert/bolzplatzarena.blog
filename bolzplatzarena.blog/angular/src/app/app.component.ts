import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly versionUpdate = new BehaviorSubject(false);

  constructor(update: SwUpdate) {
    update.available.subscribe(event => {
      update.activateUpdate().then(() => this.versionUpdate.next(true));
    });
  }

  reload(): void {
    window.location.reload();
  }
}
