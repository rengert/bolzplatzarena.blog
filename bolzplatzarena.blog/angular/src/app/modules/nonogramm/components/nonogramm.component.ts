import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nonogramm',
  templateUrl: './nonogramm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonogrammComponent implements OnInit {
  gameStarted = false;

  constructor(
    private readonly storage: StorageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.gameStarted = !!this.storage.loadGame();
  }

  newGame(): Promise<boolean> {
    this.storage.cleanGame();
    return this.router.navigate(['game'], { relativeTo: this.route });
  }
}
