import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

enum FormState {
  Unknown,
  Sent,
  Faulty
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  readonly FormState = FormState;
  readonly form: FormGroup;

  state = FormState.Unknown;

  constructor(
    formBuilder: FormBuilder,
    private readonly feedback: FeedbackService,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  async submit(): Promise<void> {
    if (!await this.feedback.send()) {
      this.state = FormState.Faulty;
      return;
    }
    this.state = FormState.Sent;
  }
}
