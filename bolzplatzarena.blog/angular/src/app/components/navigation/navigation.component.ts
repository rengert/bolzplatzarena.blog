import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    NgIf,
    SectionHeaderComponent,
    NgFor,
    RouterLink,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  @Input() header = false;

  readonly navigation: Promise<Page[]>;

  constructor(navigation: NavigationService) {
    this.navigation = navigation.get();
  }
}
