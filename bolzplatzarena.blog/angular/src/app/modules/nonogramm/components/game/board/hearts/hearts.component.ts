import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeartsComponent {
  readonly hearts = input.required<number>();

  protected items = computed(() => Array(this.hearts()).fill(0));
}
