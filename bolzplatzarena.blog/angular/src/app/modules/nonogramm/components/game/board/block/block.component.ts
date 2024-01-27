import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  input,
  OnChanges,
  Output,
} from '@angular/core';
import { Config } from '../../../../models/config';
import { GameBlock } from '../../../../models/game-block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlockComponent implements OnChanges {
  readonly config = input.required<Config>();
  readonly block = input.required<GameBlock>();
  readonly selectExpected = input<boolean>(false);

  @Output() readonly action = new EventEmitter<boolean>();
  @HostBinding() protected class = '';
  @HostBinding('class.failed') protected failed = false;
  @HostBinding('class.good') protected good = false;

  protected none = false;

  @HostListener('click')
  onClick(): void {
    if (this.block().show) {
      return;
    }

    this.block().show = true;
    this.failed = !this.block().expected && this.selectExpected() || (!this.selectExpected() && this.block().expected);
    this.good = this.block().expected;
    this.none = !this.block().expected;

    this.action.emit(this.failed);
  }

  ngOnChanges(): void {
    if (this.block().show) {
      this.class = `board-size-${this.config().size}`;
      this.good = this.block().expected;
      this.none = !this.block().expected;
    }
  }
}
