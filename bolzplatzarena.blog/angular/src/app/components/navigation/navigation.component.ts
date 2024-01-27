import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Page } from '../../models/page';
import { NavigationService } from '../../services/navigation.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    SectionHeaderComponent,
  ],
})
export class NavigationComponent {
  readonly header = input(false);

  protected readonly navigation: Promise<Page[]>;

  constructor(navigation: NavigationService) {
    this.navigation = navigation.get();
  }
}
