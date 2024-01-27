import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnChanges, signal } from '@angular/core';
import maxBy from 'lodash-es/maxBy';
import { Block } from '../../../models/block';
import { forTest } from '../../../tests/for';
import { keyByTest } from '../../../tests/key-by';
import { pullWithAllTest } from '../../../tests/pull-with';
import { reduceTest } from '../../../tests/reduce';
import { Scenario } from '../../../tests/scenario.model';
import { someTest } from '../../../tests/some';
import { duplicateArrayTest } from '../../../tests/spread';
import { Test } from '../../../tests/test.model';
import { uniqueTest } from '../../../tests/unique';
import { ButtonComponent } from '../../button/button.component';

interface TestResult extends Test {
  results: Result[];
}

interface Result extends Scenario {
  time: number | null | undefined;
  percentage?: number;
}

const tests: { [index: string]: Test | undefined } = {
  ['duplicateArrayTest']: duplicateArrayTest,
  ['forTest']: forTest,
  ['keyByTest']: keyByTest,
  ['pullWithAllTest']: pullWithAllTest,
  ['reduceTest']: reduceTest,
  ['someTest']: someTest,
  ['uniqueTest']: uniqueTest,
};

@Component({
  selector: 'app-performance-block',
  templateUrl: './performance-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ButtonComponent,
    AsyncPipe,
    DecimalPipe,
  ],
})
export class PerformanceBlockComponent implements OnChanges {
  readonly block = input.required<Block>();

  protected animating = false;
  protected test: Test = uniqueTest;
  protected readonly testResult$ = signal<TestResult | undefined>(undefined);

  ngOnChanges(): void {
    this.test = tests[this.block().body?.value ?? ''] ?? uniqueTest;
    this.testResult$.set(this.getResults());
  }

  protected runTest(): void {
    this.animating = true;
    setTimeout(() => {
      this.testResult$.set(this.getResults(true));
      this.animating = false;
    }, 16);
  }

  private getResults(run = false): TestResult {
    const results: Result[] = this.test.scenarios.map(
      scenario => ({
        ...scenario,
        time: run ? this.runScenario(scenario) : 0,
      }),
    );

    const max = maxBy(results, result => result.time)?.time ?? 0;
    results.forEach(result => {
      if ((result.time === null) || (result.time === undefined)) {
        return;
      }
      result.percentage = Math.floor((result.time / max) * 100);
    });

    return {
      ...this.test,
      loop: this.test.loop ?? 1000,
      results,
    };
  }

  private runScenario(scenario: Scenario): number {
    const start = new Date().getTime();
    for (let i = 0; i < (this.test.loop ?? 1000); i++) {
      scenario.method();
    }

    return new Date().getTime() - start;
  }
}
