import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent implements OnChanges {
  @Input() block!: Block;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.block);
  }
}
