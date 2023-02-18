import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly date = new Date();
  pageYoffset = 0;

  constructor(private readonly scroll: ViewportScroller) {
  }

  @HostListener('window:scroll') onScroll(): void {
    this.pageYoffset = window.scrollY;
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
