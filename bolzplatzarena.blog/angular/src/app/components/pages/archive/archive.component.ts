import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent {
  @HostBinding() readonly class = 'flex flex-wrap md:p-0 p-4';


  @Input() page!: Page;
}
