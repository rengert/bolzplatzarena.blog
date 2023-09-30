import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

interface Suggestion {
  headline: string;
  teaser: string;
  router: string;
}

@Component({
    selector: 'app-suggestion',
    templateUrl: './suggestion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        SectionHeaderComponent,
        NgFor,
        RouterLink,
        AsyncPipe,
    ],
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
