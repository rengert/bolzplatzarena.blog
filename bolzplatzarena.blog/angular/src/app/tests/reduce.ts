import reduce from 'lodash-es/reduce';
import { Test } from './test.model';

const array = [...Array(2500).keys()];

export const reduceTest: Test = {
  name: 'reduce lodash vs. pure',
  loop: 10000,
  scenarios: [
    {
      name: 'lodash',
      method: runLodashReduce,
    },
    {
      name: 'pure',
      method: runPureReduce,
    },
  ],
};

function runLodashReduce(): void {
  reduce(array, (sum, n) => n, 0);
}

function runPureReduce(): void {
  array.reduce((sum, n) => n, 0);
}
