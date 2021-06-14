import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Teaser } from '../../models/teaser';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  readonly posts$: Observable<Teaser[]>;

  constructor(route: ActivatedRoute, page: PageService) {
    this.posts$ = route.params.pipe(
      map(data => data.tag?.toLowerCase()),
      filter(tag => tag),
      switchMap(tag => page.archive().then(
        teasers => teasers.filter(({ tags }) => tags.some(({ title }) => title.toLowerCase() === tag)),
      )),
    );
  }
}
