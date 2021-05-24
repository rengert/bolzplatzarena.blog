import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class MetaDataService {
  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
  ) {
  }

  update(page: Page | undefined): void {
    if (!page) {
      this.emptyMeta();
      return;
    }

    const url = document.URL;
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'keywords', content: page.keywords });
    this.meta.updateTag({ name: 'robots', content: page.robots });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: page.description });
    this.meta.updateTag({ property: 'og-title', content: page.metaTitle ?? page.title });
    this.meta.updateTag({ property: 'og-url', content: url });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: url });
    this.meta.updateTag({ property: 'twitter:title', content: page.metaTitle ?? page.title });
    this.meta.updateTag({ property: 'twitter:description', content: page.description });

    this.title.setTitle(page.title);
  }

  private emptyMeta(): void {
    this.meta.updateTag({ name: 'description', content: '' });
    this.meta.updateTag({ name: 'keywords', content: '' });
    this.meta.updateTag({ name: 'robots', content: 'follow,no-index' });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: '' });
    this.meta.updateTag({ property: 'og-title', content: '' });
    this.meta.updateTag({ property: 'og-url', content: '' });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: '' });
    this.meta.updateTag({ property: 'twitter:title', content: '' });
    this.meta.updateTag({ property: 'twitter:description', content: '' });

    this.title.setTitle('Hier gibt es scheinbar gar nicht so viel zu sehen.');
  }
}
