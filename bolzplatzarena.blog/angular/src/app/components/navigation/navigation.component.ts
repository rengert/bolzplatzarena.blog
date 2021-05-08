import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from '../../models/page';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly navigation: Promise<Page[]>;

  constructor(navigation: NavigationService) {
    this.navigation = navigation.get();
  }
}
