import { ChangeDetectionStrategy, Component } from '@angular/core';
import FuzzySearch from 'fuzzy-search';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teaser } from '../../../models/teaser';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  readonly search$: Observable<Teaser[]>;
  readonly refresh$ = new BehaviorSubject<string | undefined>(undefined);

  searchString = '';

  constructor(page: PageService) {
    this.search$ = from(page.archive()).pipe(
      map(archive => new FuzzySearch(archive, ['title', 'body.value'], {
        caseSensitive: true,
      })),
      switchMap(searcher => this.refresh$.pipe(
        map(term => searcher.search(term)),
      )),
    );
  }

  search(value: string): void {
    this.refresh$.next(value);
  }
}
