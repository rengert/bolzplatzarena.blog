import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Block } from '../../../models/block';
import { BlockType } from '../../../models/block-type.enum';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HtmlBlockComponent } from '../html-block/html-block.component';
import { PerformanceBlockComponent } from '../performance-block/performance-block.component';
import { SearchComponent } from '../search/search.component';
import { SoundBlockComponent } from '../sound-block/sound-block.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CodeBlockComponent,
    HtmlBlockComponent,
    PerformanceBlockComponent,
    SearchComponent,
    SoundBlockComponent,
  ],
})
export class BlockComponent {
  readonly block = input.required<Block>();

  protected readonly BlockType = BlockType;
}
