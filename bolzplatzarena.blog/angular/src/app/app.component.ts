import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AppContextService } from './services/app-context.service';
import { FeedbackService } from './services/feedback.service';

interface Project {
  title: string;
  url: string;
  description: string;
}

const projects: Project[] = [
  {
    title: 'Pendlergeschichten - "Auch Lehrer fahren Zug - Leider!"',
    url: 'https://www.pendlergeschichten.de/',
    description: 'Auszüge aus dem Buch "Auch Lehrer fahren Zug - Leider!"',
  },
  {
    title: 'Frühstück in und um Karlsruhe',
    url: 'https://www.fruehstueck-karlsruhe.de',
    description: 'Eine Übersicht über Frühstücksmöglichkeiten in und um Karlsruhe',
  },
  {
    title: 'Bürgerenergie Karlsruhe',
    url: 'https://ben-karlsruhe.de/',
    description: 'Die Bürgerenergie Karlsruhe ist eine Genossenschaft, die sich für die Energiewende in Karlsruhe einsetzt.',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly versionUpdate = signal(false);
  protected projects = projects;

  constructor(update: SwUpdate, feedback: FeedbackService, readonly app: AppContextService) {
    update.versionUpdates.subscribe(() => {
      update.activateUpdate().then(() => this.versionUpdate.set(true));
    });
    timer(0, 5 * 60 * 1000).pipe(
      filter(() => update.isEnabled),
      switchMap(() => update.checkForUpdate()),
    ).subscribe();

    feedback.init();
  }

  reload(): void {
    window.location.reload();
  }
}
