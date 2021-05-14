import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(meta: Meta) {
    meta.addTag({ name: 'description', content: '' });
    meta.addTag({ name: 'og-title', content: '' });
  }
}
