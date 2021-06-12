import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  readonly posts$: Observable<Post[]>;

  constructor() {
    this.posts$ = of([]);
  }

  ngOnInit(): void {
  }

}
