import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { groupBy, orderBy } from 'lodash-es';
import { Taxonomy } from '../../models/taxonomy';
import { PageService } from '../../services/page.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';

interface TagCloud {
  count: number,
  tag: Taxonomy,
}

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, RouterLink, SectionHeaderComponent],
})
export class TagCloudComponent {
  protected readonly tags$: Promise<TagCloud[]>;

  constructor(page: PageService) {
    this.tags$ = page.getArchive()
      .then(teaser => teaser.map(({ tags }) => tags))
      .then(tags => tags.flat())
      .then(tags => groupBy(tags, tag => tag.title))
      .then(group => Object.values(group).map(data => ({ count: data.length, tag: data[0] })))
      .then(cloud => orderBy(cloud, item => item.count, ['desc']));
  }
}
