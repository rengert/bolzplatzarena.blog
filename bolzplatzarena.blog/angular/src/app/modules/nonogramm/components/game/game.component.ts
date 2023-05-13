import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../../models/config';
import { GameData } from '../../models/game-data';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  readonly gameData$ = new BehaviorSubject<GameData | undefined>(undefined);

  constructor(
    private readonly game: GameService,
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    const config = this.storage.loadConfig();
    this.setupGame(config);
  }

  resultGame(result: boolean): Promise<boolean> {
    if (result) {
      return this.win();
    }
    return this.lose();
  }

  private setupGame(config: Config): void {
    this.gameData$.next(this.storage.loadGame() ?? this.game.createGameData(config));
  }

  private win(): Promise<boolean> {
    alert('You win!');

    this.storage.cleanGame();
    return this.router.navigate(['../nonogramm']);
  }

  private lose(): Promise<boolean> {
    const choice = confirm('You lose! Neustarten?');
    const current = this.gameData$.value;
    if (choice && current) {
      this.gameData$.next({
        ...current,
        current: [...current.data].map(
          row => ({
            ...row,
            data: row.data.map(block => ({ ...block })),
          }),
        ),
        failed: 0,
      });
      return Promise.resolve(true);
    }
    this.storage.cleanGame();
    return this.router.navigate(['../nonogramm']);
  }
}
