import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../../models/page';
import { PostComment } from '../../models/post-comment';
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
export class FeedbackComponent implements OnChanges {
  @Input() page!: Page;

  readonly FormState = FormState;
  readonly form: FormGroup;

  readonly state$ = new BehaviorSubject(FormState.Unknown);

  comments$: Observable<PostComment[]> | undefined;

  constructor(
    formBuilder: FormBuilder,
    private readonly feedback: FeedbackService,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    this.comments$ = this.feedback.byPage(this.page);
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
