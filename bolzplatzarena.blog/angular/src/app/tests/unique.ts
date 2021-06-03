import { uniq } from 'lodash';
import { Test } from './test.model';

const array = [...Array(25000).keys()].map(item => ({
  id: item,
  value: Math.floor(Math.random() * 100),
}));

export const uniqueTest: Test = {
  name: 'unique',
  loop: 1000,
  scenarios: [
    {
      name: 'unique',
      method: uniqueTestMethod,
    },
    {
      name: 'set',
      method: setTest,
    },
  ],
};

function uniqueTestMethod(): void {
  uniq(array.map(item => item.value));
}

function setTest(): void {
  const unique = [...new Set(array.map(item => item.value))];
}
