import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Teaser } from '../../../../models/teaser';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaserComponent {
  @Input() teaser!: Teaser;
}
