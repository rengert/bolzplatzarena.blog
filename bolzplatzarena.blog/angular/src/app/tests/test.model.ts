import { Scenario } from './scenario.model';

export interface Test {
  name: string;
  scenarios: Scenario[];
  loop?: number;
}
