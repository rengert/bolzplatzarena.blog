import { NgIf, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
})
export class FooterComponent {
  readonly date = new Date();
  readonly scrolled = signal(false);

  constructor(private readonly scroll: ViewportScroller) {
  }

  @HostListener('window:scroll') onScroll(): void {
    this.scrolled.set(window.scrollY > 0);
  }

  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
