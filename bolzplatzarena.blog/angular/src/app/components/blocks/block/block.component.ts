import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    NgIf,
    HtmlBlockComponent,
    CodeBlockComponent,
    PerformanceBlockComponent,
    SoundBlockComponent,
    SearchComponent,
  ],
})
export class BlockComponent {
  @Input() block!: Block;

  readonly BlockType = BlockType;
}
