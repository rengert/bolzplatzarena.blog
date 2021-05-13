import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly date = new Date();
}
