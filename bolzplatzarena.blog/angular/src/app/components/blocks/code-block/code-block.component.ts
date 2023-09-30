import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Block } from '../../../models/block';

@Component({
    selector: 'app-code-block',
    templateUrl: './code-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class CodeBlockComponent {
  @Input() block!: Block;
}
