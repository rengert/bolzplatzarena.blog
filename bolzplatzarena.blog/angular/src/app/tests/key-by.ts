import keyBy from 'lodash/keyBy';
import { Test } from './test.model';

interface Dictionary<T> {
  [id: number]: T;
}

const array = [...Array(2000).keys()].map(item => ({
  id: item,
  value: Math.floor(Math.random() * 100),
}));

const badKeyBy = (data: any[], key: string) => (data ?? []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

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
      method: lodashTest,
    },
    {
      name: 'bad native',
      method: badKeybyTest,
    },
    {
      name: 'native',
      method: nativeTest,
    },
  ],
};

function lodashTest(): void {
  keyBy(array, item => item.id);
}

function badKeybyTest(): void {
  badKeyBy(array, 'id');
}

function nativeTest(): void {
  nativeKeyBy(array, 'id');
}
