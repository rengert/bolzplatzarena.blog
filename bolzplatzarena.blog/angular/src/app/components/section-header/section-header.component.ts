import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-section-header',
    templateUrl: './section-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class SectionHeaderComponent {
  @Input() title!: string;
}
