import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Teaser } from '../../../../models/teaser';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NgOptimizedImage,
    RouterLink,
  ],
})
export class TeaserComponent {
  readonly teaser = input.required<Teaser>();

  @HostBinding() protected readonly class = 'flex flex-col border-b border-gray-300 pr-4';

  protected get teaserImage(): string | undefined {
    if (this.teaser().image) {
      return `${environment.apiUrl}/api/image${this.teaser().image}?width=325&height=160`;
    }
    return undefined;
  }
}
