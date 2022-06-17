import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AppContextService } from './services/app-context.service';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly versionUpdate = new BehaviorSubject(false);

  constructor(update: SwUpdate, feedback: FeedbackService, readonly app: AppContextService) {
    update.available.subscribe(() => {
      update.activateUpdate().then(() => this.versionUpdate.next(true));
    });
    timer(0, 5 * 60 * 1000).pipe(
      filter(() => update.isEnabled),
      switchMap(() => update.checkForUpdate()),
    ).subscribe();

    feedback.init();

    app.selectionInfo$.pipe(tap(console.log)).subscribe();
    app.definedSelection$.pipe(tap(console.log)).subscribe();
  }

  reload(): void {
    window.location.reload();
  }
}
