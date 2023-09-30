import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Page } from '../../../models/page';
import { TeaserComponent } from './teaser/teaser.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, TeaserComponent],
})
export class ArchiveComponent {
  @HostBinding() readonly class = 'flex flex-wrap md:p-0 p-4';


  @Input() page!: Page;
}
