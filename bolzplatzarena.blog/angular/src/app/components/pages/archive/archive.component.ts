import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { Page } from '../../../models/page';
import { TeaserComponent } from './teaser/teaser.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TeaserComponent],
})
export class ArchiveComponent {
  readonly page = input.required<Page>();

  @HostBinding() protected readonly class = 'flex flex-wrap md:p-0 p-4';
}
