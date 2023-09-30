import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PageType } from '../../models/page-type.enum';
import { Content, ContentService } from '../../services/content.service';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { BlockComponent } from '../blocks/block/block.component';
import { ArchiveComponent } from '../pages/archive/archive.component';
import { NgIf, NgSwitch, NgSwitchCase, NgFor, NgSwitchDefault, AsyncPipe, DatePipe } from '@angular/common';


@Component({
    selector: 'app-cms-component',
    templateUrl: './cms.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgSwitch,
        NgSwitchCase,
        ArchiveComponent,
        NgFor,
        BlockComponent,
        NgSwitchDefault,
        FeedbackComponent,
        SuggestionComponent,
        AsyncPipe,
        DatePipe,
    ],
})
export class CmsComponent {
  readonly data$: Observable<Content>;

  readonly PageType = PageType;

  constructor(content: ContentService) {
    this.data$ = content.data$;
  }
}
