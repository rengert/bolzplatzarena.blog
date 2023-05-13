import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { GameBlock } from '../models/game-block';
import { GameData } from '../models/game-data';
import { GameRow } from '../models/game-row';
import { Level } from '../models/level.enum';

const probabilityEasy = 0.1;
const probabilityMedium = 0.05;

const probability = 0.6;

function shouldBeShown(expected: boolean, config: Config): boolean {
  if (expected) {
    return false;
  }
  let result: boolean;
  switch (config.level) {
    case Level.easy:
      result = Math.random() < probabilityEasy;
      break;
    case Level.medium:
      result = Math.random() < probabilityMedium;
      break;
    default:
      result = false;
  }

  return result;
}

function createRow(config: Config, rowIndex: number): GameRow {
  const row: GameRow = { row: rowIndex + 1, data: [] as GameBlock[] };
  for (let j = 0; j < config.size; j++) {
    const expected = Math.random() < probability;
    row.data.push({
      column: j + 1,
      row: rowIndex + 1,
      expected,
      show: shouldBeShown(expected, config),
    });
  }

  return row;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  createGameData(config: Config): GameData {
    const gameData: GameData = {
      failed: 0,
      data: [],
      current: [],
      config,
    };
    for (let i = 0; i < config.size; i++) {
      gameData.data.push(createRow(config, i));
    }
    gameData.current = [...gameData.data].map(
      row => ({
        ...row,
        data: row.data.map(block => ({ ...block })),
      }),
    );

    return gameData;
  }
}
