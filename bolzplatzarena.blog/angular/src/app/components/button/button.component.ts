import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ButtonComponent {
}
