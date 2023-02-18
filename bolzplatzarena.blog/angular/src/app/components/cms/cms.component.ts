import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PageType } from '../../models/page-type.enum';
import { Content, ContentService } from '../../services/content.service';


@Component({
  selector: 'app-cms-component',
  templateUrl: './cms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsComponent {
  readonly data$: Observable<Content>;

  readonly PageType = PageType;

  constructor(content: ContentService) {
    this.data$ = content.data$;
  }
}
