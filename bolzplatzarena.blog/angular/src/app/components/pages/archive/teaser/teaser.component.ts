import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Teaser } from '../../../../models/teaser';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    ],
})
export class TeaserComponent {

  @HostBinding() readonly class = 'flex flex-col border-b border-gray-300 pr-4';

  @Input() teaser!: Teaser;

  get teaserImage(): string | undefined {
    if (this.teaser.image) {
      return `${environment.apiUrl}${this.teaser.image}`;
    }
    return undefined;
  }
}
