import { Caption } from '../../../models/caption';
import { GameData } from '../../../models/game-data';

export function generateRowHints(gameData: GameData): Caption[][] {
  return generateHints(gameData, true);
}

export function generateColumnHints(gameData: GameData): Caption[][] {
  return generateHints(gameData, false);
}

function generateHints(gameData: GameData, isRow: boolean): Caption[][] {
  const result = [];
  for (let i = 0; i < gameData.config.size; i++) {
    result.push(generateHint(gameData, isRow, i));
  }

  return result;
}

function generateHint(gameData: GameData, isRow: boolean, line: number): Caption[] {
  const row: Caption[] = [];
  let count = 0;
  let done = true;
  let index = 0;
  for (let j = 0; j < gameData.config.size; j++) {
    const item = isRow
      ? gameData.current[line].data[j]
      : gameData.current[j].data[line];
    done = done && item.show;
    if (item.expected) {
      count++;
    } else {
      if (count > 0) {
        index++;
        row.push({ row: line + 1, index, items: count, done });
      }
      count = 0;
    }
  }
  if (count > 0) {
    index++;
    row.push({ row: line + 1, index, items: count, done });
  }

  return row;
}
