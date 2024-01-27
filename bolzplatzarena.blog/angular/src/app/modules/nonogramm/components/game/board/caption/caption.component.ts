import { ChangeDetectionStrategy, Component, HostBinding, input, OnChanges } from '@angular/core';
import { Caption } from '../../../../models/caption';
import { Config } from '../../../../models/config';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.vertical]': 'vertical()',
  },
})
export class CaptionComponent implements OnChanges {
  readonly config = input.required<Config>();
  readonly numbers = input.required<Caption[]>();

  readonly vertical = input<boolean>(false);

  @HostBinding('class') protected cssClass = '';
  @HostBinding('class') protected numbersClass = '';

  ngOnChanges(): void {
    this.numbersClass = `text-length-${this.numbers().length}`;
    this.cssClass = `board-size-${this.config().size}`;
  }
}
