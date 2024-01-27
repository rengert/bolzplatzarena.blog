import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-html-block',
  templateUrl: './html-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HtmlBlockComponent {
  readonly block = input<Block>();
}
