import pullAllWith from 'lodash-es/pullAllWith';
import { Test } from './test.model';

const array = [...Array(2500).keys()];
const pullArray = [...Array(75).keys()];

export const pullWithAllTest: Test = {
  name: 'lodash pullAll vs. plain ts',
  loop: 1000,
  scenarios: [
    {
      name: 'lodash pullAllWith',
      method: pullAllWithTest,
    },
    {
      name: 'pull with find & inlcudes',
      method: pullWithFindAndIncludes,
    },
    {
      name: 'pull with find & some',
      method: pullWithFindAndSome,
    },
  ],
};

function pullAllWithTest(): void {
  const localArray = [...array];
  pullAllWith(localArray, pullArray, (a, b) => a === b);
}

function pullWithFindAndIncludes(): void {
  array.filter(item => !pullArray.includes(item));
}

function pullWithFindAndSome(): void {
  array.filter(item => !pullArray.some(a => item === a));
}
