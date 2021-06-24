import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  readonly form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  submit(): void {

  }
}
