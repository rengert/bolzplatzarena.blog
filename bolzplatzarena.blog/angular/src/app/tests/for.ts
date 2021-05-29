import { Test } from './test.model';

const array = [...Array(25000).keys()];

export const forTest: Test = {
  name: 'for vs. each',
  loop: 10000,
  scenarios: [
    {
      name: 'for',
      method: forLoop,
    },
    {
      name: 'forEach',
      method: forEachLoop,
    },
    {
      name: 'forOf',
      method: forOfLoop,
    },
  ],
};

function forEachLoop(): void {
  let i = 0;
  array.forEach(item => i += item);
}

function forLoop(): void {
  let i = 0;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let j = 0; j < array.length; j++) {
    i += array[j];
  }
}

function forOfLoop(): void {
  let i = 0;
  for (const item of array) {
    i += item;
  }
}
