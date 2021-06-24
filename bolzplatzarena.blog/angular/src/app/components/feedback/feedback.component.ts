import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../models/page';
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
  @Input() page!: Page;

  readonly FormState = FormState;
  readonly form: FormGroup;

  readonly state$ = new BehaviorSubject(FormState.Unknown);

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
    if (!await this.feedback.send({ slug: this.page.link, ...this.form.value })) {
      this.state$.next(FormState.Faulty);
      return;
    }

    this.form.reset();
    this.state$.next(FormState.Sent);
  }
}
