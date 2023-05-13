import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { GameData } from '../models/game-data';
import { Level } from '../models/level.enum';
import { Size } from '../models/size.enum';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly configStorageKey = 'config';
  private readonly gameStorageKey = 'game';

  loadConfig(): Config {
    const data = localStorage.getItem(this.configStorageKey);

    return data
      ? JSON.parse(data)
      : { size: Size.large, level: Level.easy };
  }

  saveConfig(config: Config): void {
    localStorage.setItem(
      this.configStorageKey,
      JSON.stringify(config),
    );
  }

  loadGame(): GameData | undefined {
    const data = localStorage.getItem(this.gameStorageKey);

    return data
      ? JSON.parse(data)
      : undefined;
  }

  saveGame(game: GameData): void {
    localStorage.setItem(
      this.gameStorageKey,
      JSON.stringify(game),
    );
  }

  cleanGame(): void {
    localStorage.removeItem(this.gameStorageKey);
  }
}
