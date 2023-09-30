import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../../models/page';
import { PostComment } from '../../models/post-comment';
import { FeedbackService } from '../../services/feedback.service';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
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
        NgIf,
        NgFor,
        FormsModule,
        ReactiveFormsModule,
        AsyncPipe,
        DatePipe,
    ],
})
export class FeedbackComponent implements OnChanges {
  @Input() page!: Page;

  readonly FormState = FormState;
  readonly form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    comment: new FormControl<string>('', Validators.required),
  });

  readonly state$ = new BehaviorSubject(FormState.Unknown);

  comments$: Observable<PostComment[]> | undefined;

  constructor(private readonly feedback: FeedbackService) {
  }

  ngOnChanges(): void {
    this.comments$ = this.feedback.byPage(this.page);
  }

  async submit(): Promise<void> {
    if (!await this.feedback.send({
      slug: this.page.link,
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
