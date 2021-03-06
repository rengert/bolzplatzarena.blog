import * as moment from 'moment';
import { Test } from './test.model';

export const createMomentTest: Test = {
  name: 'Verwendung Datum',
  scenarios: [
    {
      name: 'Erstelle Moment',
      method: createMoment,
    },
    {
      name: 'Erstelle Date',
      method: createDateFromString,
    },
    {
      name: 'Erstelle Moment mit Date',
      method: createMomentFromDate,
    },
  ],
};

function createMoment(): void {
  const data = moment('2011-01-01T12:12:12.123');
}

function createMomentFromDate(): void {
  const data = moment(new Date('2011-01-01T12:12:12.123'));
}

function createDateFromString(): void {
  const date = new Date('2011-01-01T12:12:12.123');
}
