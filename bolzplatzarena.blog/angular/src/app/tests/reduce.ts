import reduce from 'lodash/reduce';
import { Test } from './test.model';

const array = [...Array(2500).keys()];

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
  reduce(array, (sum, n) => n, 0);
}

function pureReduce(): void {
  array.reduce((sum, n) => n, 0);
}
