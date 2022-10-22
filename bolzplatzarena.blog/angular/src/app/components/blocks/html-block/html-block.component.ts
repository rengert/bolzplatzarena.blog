import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-html-block',
  templateUrl: './html-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlBlockComponent {
  @Input() block?: Block;
}
