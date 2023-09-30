import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { timer } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
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
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    SectionHeaderComponent,
    NgFor,
    NavigationComponent,
    TagCloudComponent,
    NgIf,
    FooterComponent,
  ],
})
export class AppComponent {
  protected readonly versionUpdate = signal(false);
  protected projects = projects;

  constructor(update: SwUpdate, feedback: FeedbackService, readonly app: AppContextService) {
    update.versionUpdates.pipe(
      switchMap(() => update.activateUpdate()),
      tap(() => this.versionUpdate.set(true)),
    ).subscribe();
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
