import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Block } from '../../../models/block';
import { BlockType } from '../../../models/block-type.enum';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockComponent {
  @Input() block!: Block;

  readonly BlockType = BlockType;
}
