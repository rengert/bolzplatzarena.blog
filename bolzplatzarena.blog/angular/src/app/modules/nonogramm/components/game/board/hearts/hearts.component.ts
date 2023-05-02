import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartsComponent implements OnChanges {
  @Input() hearts!: number;

  @HostBinding('class') heartClass = '';

  items: number[] = [];

  ngOnChanges(): void {
    try {
      this.items = [];
      for (let i = 1; i <= this.hearts; i++) {
        this.items.push(i);
      }
      this.heartClass = `hearts-${this.hearts}`;
    } catch {
      //
    }
  }
}
