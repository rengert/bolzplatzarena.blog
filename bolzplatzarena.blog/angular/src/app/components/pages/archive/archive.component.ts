import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent {
  @Input() page!: Page;
}
