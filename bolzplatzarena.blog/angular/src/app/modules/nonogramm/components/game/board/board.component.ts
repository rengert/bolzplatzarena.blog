import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Caption } from '../../../models/caption';
import { GameBlock } from '../../../models/game-block';
import { GameData } from '../../../models/game-data';
import { StorageService } from '../../../services/storage.service';
import { BlockComponent } from './block/block.component';
import { generateColumnHints, generateRowHints } from './board.utils';
import { CaptionComponent } from './caption/caption.component';
import { HeartsComponent } from './hearts/hearts.component';

const HEART_LIMIT = 3;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HeartsComponent,
    CaptionComponent,
    BlockComponent,
    FormsModule,
  ],
})
export class BoardComponent implements OnChanges {
  readonly boardData = input.required<GameData>();

  @Output() readonly resultEvent = new EventEmitter<boolean>();

  @HostBinding() protected class = '';

  protected columnHints!: Caption[][];
  protected rowHints!: Caption[][];
  protected hearts!: number;
  protected selectType = true;

  constructor(private readonly storage: StorageService) {
  }

  ngOnChanges(): void {
    this.class = `block board-size-${this.boardData().config.size}`;

    this.checkBoard();
  }

  protected onAction(failed: boolean): void {
    if (failed) {
      this.boardData().failed++;
      this.hearts = HEART_LIMIT - this.boardData().failed;
    }
    this.checkBoard();
  }

  private checkBoard(): void {
    this.columnHints = generateColumnHints(this.boardData());
    this.rowHints = generateRowHints(this.boardData());

    this.hearts = HEART_LIMIT - this.boardData().failed;
    this.storage.saveGame(this.boardData());
    if (this.boardData().failed >= HEART_LIMIT) {
      this.resultEvent.emit(false);
    }
    const blocks = this.boardData().current
      .reduce((blocksFromData, row) => [...blocksFromData, ...row.data], [] as GameBlock[]);
    const missing = blocks.filter(({ expected, show }) => expected && !show);
    if (missing.length === 0) {
      this.resultEvent.emit(true);
    }
  }
}
