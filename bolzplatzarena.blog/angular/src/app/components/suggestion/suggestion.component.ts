import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

interface Suggestion {
  headline: string;
  teaser: string;
  router: string;
}

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionComponent {
  @Input() page!: Page;

  readonly suggestions$: Promise<Suggestion[]>;

  constructor(page: PageService) {
    this.suggestions$ = page.archive()
      .then(archive => archive.filter(item => item.link !== this.page.link))
      .then(archive => archive.filter(item => item.tags?.some(({ title }) => this.page.tags?.some(tag => tag.title === title))))
      .then(archive => archive.map(item => ({ headline: item.title, router: item.link, teaser: item.body.value })));
  }
}
