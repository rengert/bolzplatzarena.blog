import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SectionHeaderComponent {
  readonly title = input.required<string>();
}
