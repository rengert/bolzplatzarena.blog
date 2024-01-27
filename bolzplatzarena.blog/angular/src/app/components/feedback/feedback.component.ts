import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../../models/page';
import { PostComment } from '../../models/post-comment';
import { FeedbackService } from '../../services/feedback.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';

enum FormState {
  Unknown,
  Sent,
  Faulty
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SectionHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
  ],
})
export class FeedbackComponent implements OnChanges {
  readonly page = input.required<Page>();

  protected readonly FormState = FormState;
  protected readonly form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    comment: new FormControl<string>('', Validators.required),
  });

  protected readonly state$ = new BehaviorSubject(FormState.Unknown);
  protected comments$: Observable<PostComment[]> | undefined;

  constructor(private readonly feedback: FeedbackService) {
  }

  ngOnChanges(): void {
    this.comments$ = this.feedback.byPage(this.page());
  }

  protected async submit(): Promise<void> {
    if (!await this.feedback.send({
      slug: this.page().link,
      name: this.form.value.name ?? '',
      comment: this.form.value.comment ?? '',
    })) {
      this.state$.next(FormState.Faulty);
      return;
    }

    this.form.reset();
    this.state$.next(FormState.Sent);
  }
}
