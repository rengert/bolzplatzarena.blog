import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageType } from '../../models/page-type.enum';
import { Content, ContentService } from '../../services/content.service';
import { BlockComponent } from '../blocks/block/block.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ArchiveComponent } from '../pages/archive/archive.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ArchiveComponent,
    BlockComponent,
    FeedbackComponent,
    SuggestionComponent,
    AsyncPipe,
    DatePipe,
    NgOptimizedImage,
  ],
})
export class CmsComponent {
  protected readonly data$: Observable<Content>;

  protected readonly PageType = PageType;

  constructor(content: ContentService) {
    this.data$ = content.data$;
  }

  protected getImage(image: string): string {
    return `${environment.apiUrl}/api/image${image}?width=682&height=340`;
  }
}
