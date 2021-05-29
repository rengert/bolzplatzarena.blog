import { reduce } from 'lodash';
import { Test } from './test.model';

const array = [...Array(25000).keys()];

export const reduceTest: Test = {
  name: 'reduce lodash vs. pure',
  loop: 10000,
  scenarios: [
    {
      name: 'lodash',
      method: lodashReduce,
    },
    {
      name: 'pure',
      method: pureReduce,
    },
  ],
};

function lodashReduce(): void {
  reduce(array, (sum, n) => sum + n, 0);
}

function pureReduce(): void {
  array.reduce((sum, n) => sum + n, 0);
}
