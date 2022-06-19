import { Test } from './test.model';

const array = [...Array(250000).keys()];

export const duplicateArrayTest: Test = {
  name: 'duplicate array',
  loop: 1000,
  scenarios: [
    {
      name: 'spread',
      method: spreadTest,
    },
    {
      name: 'concat',
      method: concatTest,
    },
    {
      name: 'slice',
      method: sliceTest,
    },
    {
      name: 'for',
      method: forTest,
    },
  ],
};

function spreadTest(): void {
  [...array];
}

function concatTest(): void {
  const numbers: number[] = [];
  numbers.concat(array);
}

function sliceTest(): void {
  array.slice();
}

function forTest(): void {
  const data: number[] = [];
  for (const item of array) {
    data.push(item);
  }
}
