import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { maxBy } from 'lodash';
import { Block } from '../../../models/block';
import { forTest } from '../../../tests/for';
import { keyByTest } from '../../../tests/key-by';
import { createMomentTest } from '../../../tests/moment';
import { pullWithAllTest } from '../../../tests/pull-with';
import { reduceTest } from '../../../tests/reduce';
import { Scenario } from '../../../tests/scenario.model';
import { someTest } from '../../../tests/some';
import { duplicateArrayTest } from '../../../tests/spread';
import { Test } from '../../../tests/test.model';
import { uniqueTest } from '../../../tests/unique';

interface TestResult extends Test {
  results: Result[];
}

interface Result extends Scenario {
  time?: number;
  percentage?: number;
}

const tests: { [index: string]: Test } = {
  ['createMomentTest']: createMomentTest,
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
})
export class PerformanceBlockComponent implements OnChanges {
  @Input() block!: Block;

  test: Test = createMomentTest;
  testResult?: TestResult;

  ngOnChanges(): void {
    this.test = tests[this.block.body?.value ?? ''] ?? createMomentTest;
    this.testResult = this.getResults();
  }

  runTest(): void {
    this.testResult = this.getResults(true);
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
      result.percentage = Math.floor((result.time ! / max) * 100);
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
