import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Page } from '../../models/page';
import { NavigationService } from '../../services/navigation.service';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

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
