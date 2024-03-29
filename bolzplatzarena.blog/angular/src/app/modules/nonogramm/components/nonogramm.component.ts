import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nonogramm',
  templateUrl: './nonogramm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class NonogrammComponent {
  protected readonly gameStarted: boolean;

  constructor(
    private readonly storage: StorageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.gameStarted = !!this.storage.loadGame();
  }

  protected newGame(): void {
    this.storage.cleanGame();

    void this.router.navigate(['game'], { relativeTo: this.route });
  }
}
