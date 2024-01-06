import { DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Teaser } from '../../../../models/teaser';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    DatePipe,
    NgOptimizedImage,
  ],
})
export class TeaserComponent {

  @HostBinding() readonly class = 'flex flex-col border-b border-gray-300 pr-4';

  @Input() teaser!: Teaser;

  get teaserImage(): string | undefined {
    if (this.teaser.image) {
      return `${environment.apiUrl}/api/image/${this.teaser.image}?width=325&height=160`;
    }
    return undefined;
  }
}
