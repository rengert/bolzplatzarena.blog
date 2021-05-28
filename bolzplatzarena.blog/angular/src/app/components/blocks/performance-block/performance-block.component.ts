import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Test {
  name: string;
}

interface Result {
  label: string;
  time?: number;
  percentage?: number;
}


@Component({
  selector: 'app-performance-block',
  templateUrl: './performance-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceBlockComponent {
  test: Test = { name: 'Performance Moment' };
  data: Result[] = [
    {
      label: 'Mein Super Test',
    },
    {
      label: 'Mein Super Test',
    },
  ];
}
