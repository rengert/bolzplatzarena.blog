import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Config } from '../../models/config';
import { GameData } from '../../models/game-data';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BoardComponent, RouterLink],
})
export class GameComponent implements OnInit {
  protected readonly gameData = signal<GameData | undefined>(undefined);

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

  protected resultGame(result: boolean): void {
    result ? this.handleWin() : this.handleLose();
  }

  private setupGame(config: Config): void {
    this.gameData.set(this.storage.loadGame() ?? this.game.createGameData(config));
  }

  private handleWin(): void {
    alert('You win!');

    this.storage.cleanGame();
    void this.router.navigate(['../nonogramm']);
  }

  private handleLose(): void {
    const choice = confirm('You lose! Neustarten?');
    const current = this.gameData();
    if (choice && current) {
      this.gameData.set({
        ...current,
        current: [...current.data].map(
          row => ({
            ...row,
            data: row.data.map(block => ({ ...block })),
          }),
        ),
        failed: 0,
      });
      return;
    }
    this.storage.cleanGame();
    void this.router.navigate(['../nonogramm']);
  }
}
