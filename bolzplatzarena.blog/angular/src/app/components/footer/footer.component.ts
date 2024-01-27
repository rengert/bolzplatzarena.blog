import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FooterComponent {
  protected readonly date = new Date();
  protected readonly scrolled = signal(false);

  constructor(private readonly scroll: ViewportScroller) {
  }

  @HostListener('window:scroll') onScroll(): void {
    this.scrolled.set(window.scrollY > 0);
  }

  protected scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
