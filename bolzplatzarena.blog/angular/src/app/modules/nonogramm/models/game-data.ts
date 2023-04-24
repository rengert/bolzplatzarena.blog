import { Config } from './config';
import { GameRow } from './game-row';

export interface GameData {
  config: Config;
  data: GameRow[];
  current: GameRow[];
  failed: number;
}
