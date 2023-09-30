import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MetaInfo } from '../../models/meta-info';
import { Teaser } from '../../models/teaser';
import { MetaDataService } from '../../services/meta-data.service';
import { PageService } from '../../services/page.service';
import { TeaserComponent } from '../pages/archive/teaser/teaser.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    TeaserComponent,
    AsyncPipe,
  ],
})
export class TagsComponent {
  @HostBinding() readonly class = 'block md:p-0 p-4';

  readonly posts$: Observable<Teaser[]>;

  constructor(route: ActivatedRoute, page: PageService, metaData: MetaDataService) {
    this.posts$ = route.params.pipe(
      map(data => data.tag?.toLowerCase()),
      filter(tag => tag),
      tap(tag => metaData.update({
        title: `Posts zum Thema: ${tag}`,
        metaTitle: `Posts zum Thema: ${tag}`,
        description: `Hier finden Sie alle Posts zum Thema: ${tag}`,
        keywords: '',
        robots: 'follow,no-index',
      } as MetaInfo)),
      switchMap(tag => page.getArchive().then(
        teasers => teasers.filter(({ tags }) => tags.some(({ title }) => title.toLowerCase() === tag)),
      )),
    );
  }
}
