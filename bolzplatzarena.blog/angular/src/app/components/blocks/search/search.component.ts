import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import FuzzySearch from 'fuzzy-search';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teaser } from '../../../models/teaser';
import { PageService } from '../../../services/page.service';
import { TeaserComponent } from '../../pages/archive/teaser/teaser.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    TeaserComponent,
    AsyncPipe,
  ],
})
export class SearchComponent {
  protected searchString = '';
  protected readonly search$: Observable<Teaser[]>;
  protected readonly refresh$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(page: PageService) {
    this.search$ = from(page.getArchive()).pipe(
      map(archive => new FuzzySearch(archive, ['title', 'body.value'], {
        caseSensitive: true,
      })),
      switchMap(searcher => this.refresh$.pipe(
        map(term => searcher.search(term)),
      )),
    );
  }

  protected search(value: string): void {
    this.refresh$.next(value);
  }
}
