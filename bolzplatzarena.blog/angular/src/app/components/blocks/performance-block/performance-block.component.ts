import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-performance-block',
  templateUrl: './performance-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceBlockComponent {
  data = [
    {
      label: 'Mein Super Test',
      value: 10,
      time: 123,
    },
    {
      label: 'Mein Super Test',
      value: 45,
      time: 1232,
    },
  ];
}
