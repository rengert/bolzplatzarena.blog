import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Page } from '../../models/page';
import { Teaser } from '../../models/teaser';
import { MetaDataService } from '../../services/meta-data.service';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  readonly posts$: Observable<Teaser[]>;

  constructor(route: ActivatedRoute, page: PageService, metaData: MetaDataService) {
    this.posts$ = route.params.pipe(
      map(data => data.tag?.toLowerCase()),
      filter(tag => tag),
      tap(tag => metaData.update({
        title: `Posts zum Thema: ${tag}`,
        robots: 'follow,no-index',
      } as Page)),
      switchMap(tag => page.archive().then(
        teasers => teasers.filter(({ tags }) => tags.some(({ title }) => title.toLowerCase() === tag)),
      )),
    );
  }
}
