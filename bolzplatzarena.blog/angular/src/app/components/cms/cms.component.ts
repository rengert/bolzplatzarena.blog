import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { Page } from '../../models/page';
import { PageType } from '../../models/page-type.enum';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
})
export class CmsComponent implements OnInit {
  data$: Observable<Page | undefined>;

  readonly PageType = PageType;

  constructor(page: PageService, router: Router) {
    this.data$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
      startWith(router.url),
      switchMap(url => page.bySlug(url)));
  }

  ngOnInit(): void {
  };
}
