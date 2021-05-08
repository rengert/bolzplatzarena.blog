import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../models/post';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaserComponent {
  @Input() post!: Post;
}
