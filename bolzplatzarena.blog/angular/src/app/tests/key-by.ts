import keyBy from 'lodash-es/keyBy';
import { Test } from './test.model';

interface Dictionary<T> {
  [id: number]: T;
}

interface Example extends Dictionary<string> {
  id: unknown;
  value: unknown;
}

const array: Example[] = [...Array(2000).keys()].map(item => ({
  id: item,
  value: Math.floor(Math.random() * 100),
}));

const runBadKeyBy = (data: Example[], key: keyof Example): {
  [key: string]: Example
} => (data ?? []).reduce((r, x) => ({
  ...r,
  [(key ? x[key] : x) as string]: x,
}), {});

function nativeKeyBy<T extends { [index: string]: number; }>(data: T[], key: string): Dictionary<T> {
  return (data ?? []).reduce((prev: Dictionary<T>, newValue: T) => {
    prev[newValue[key]] = newValue;

    return prev;
  }, {});
}

export const keyByTest: Test = {
  name: 'keyByTest',
  loop: 2,
  scenarios: [
    {
      name: 'lodash',
      method: runLodashTest,
    },
    {
      name: 'bad native',
      method: runBadKeybyTest,
    },
    {
      name: 'native',
      method: runNativeTest,
    },
  ],
};

function runLodashTest(): void {
  keyBy(array, item => item.id);
}

function runBadKeybyTest(): void {
  runBadKeyBy(array, 'id');
}

function runNativeTest(): void {
  nativeKeyBy(array as unknown as { [index: string]: number; }[], 'id');
}
