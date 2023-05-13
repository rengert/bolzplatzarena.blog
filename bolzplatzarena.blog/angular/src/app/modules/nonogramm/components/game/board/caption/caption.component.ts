import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';
import { Caption } from '../../../../models/caption';
import { Config } from '../../../../models/config';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptionComponent implements OnChanges {
  @Input() config!: Config;
  @Input() numbers!: Caption[];
  @Input() @HostBinding('class.vertical') vertical = false;

  @HostBinding('class') cssClass = '';
  @HostBinding('class') numbersClass = '';

  ngOnChanges(): void {
    this.numbersClass = `text-length-${this.numbers.length}`;
    this.cssClass = `board-size-${this.config.size}`;
  }
}
