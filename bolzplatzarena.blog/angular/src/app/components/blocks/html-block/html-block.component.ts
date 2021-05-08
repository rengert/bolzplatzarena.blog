import { Component, Input } from '@angular/core';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-html-block',
  templateUrl: './html-block.component.html',
  styleUrls: ['./html-block.component.scss'],
})
export class HtmlBlockComponent {
  @Input() block!: Block;
}
