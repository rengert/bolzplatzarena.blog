import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Article, Thing, WebSite, WithContext } from 'schema-dts';
import { environment } from '../../environments/environment';
import { MetaInfo } from '../models/meta-info';
import { Page } from '../models/page';
import { PageType } from '../models/page-type.enum';

function isPage(page: Page | MetaInfo | undefined): page is Page {
  if (page === undefined) {
    return false;
  }
  const test = page as { type: unknown };
  return test.type !== undefined;
}

function log(
  target: unknown,
  propertyKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: TypedPropertyDescriptor<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): TypedPropertyDescriptor<any> {
  if (environment.production) {
    return descriptor;
  }
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]): unknown {
    // eslint-disable-next-line no-console
    console.log(`The method ${propertyKey} args are: `, args);
    const result = originalMethod.apply(this, args);
    // eslint-disable-next-line no-console
    console.log('The return value is: ', result);
    return result;
  };
  return descriptor;
}

@Injectable({ providedIn: 'root' })
export class MetaDataService {
  readonly info = 'https://schema.org';
  private readonly schema: HTMLScriptElement;
  private readonly globalSchema: HTMLScriptElement;

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
  ) {
    this.globalSchema = document.createElement('script');
    this.globalSchema.type = 'application/ld+json';
    this.globalSchema.innerHTML = '';
    document.head.appendChild(this.globalSchema);

    this.schema = document.createElement('script');
    this.schema.type = 'application/ld+json';
    this.schema.innerHTML = '';
    document.head.appendChild(this.schema);
  }

  @log
  update(page: Page | MetaInfo | undefined): void {
    if (!page) {
      this.emptyMeta();
      return;
    }

    const url = document.URL;
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'keywords', content: page.keywords ?? 'bolzplatzarena,asp.net,angular,typescript' });
    this.meta.updateTag({ name: 'robots', content: page.robots ?? 'infex,follow' });
    // open graph
    this.meta.updateTag({ property: 'og-description', content: page.description });
    this.meta.updateTag({ property: 'og-title', content: `${page.metaTitle ?? page.title} - bolzplatzarena.net` });
    this.meta.updateTag({ property: 'og-url', content: url });
    // twitter
    this.meta.updateTag({ property: 'twitter:url', content: url });
    this.meta.updateTag({ property: 'twitter:title', content: page.metaTitle ?? page.title });
    this.meta.updateTag({ property: 'twitter:description', content: page.description });

    this.title.setTitle(`${page.title} - bolzplatzarena.net`);

    const website: WithContext<WebSite> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'bolzplatzarena.net',
      url: 'https://www.bolzplatzarena.net/',
    };
    this.setSchema(this.globalSchema, website);

    this.clearSchema(this.schema);
    if (isPage(page) && (page.type === PageType.Post)) {
      const article: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        url,
        name: page.metaTitle ?? page.title,
        headline: page.metaTitle ?? page.title,
        description: page.description,
        datePublished: page.dateTime,
        author: {
          '@type': 'Person',
          name: page.author,
          url: 'https://www.bolzplatzarena.net/',
        },
        image: page.image ?? 'https://bolzplatzarena.net/assets/not-found-bolzplatzarena.png',
      };
      this.setSchema(this.schema, article);
    }
  }

  @log
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

    this.title.setTitle('Hier gibt es scheinbar gar nicht so viel zu sehen. - bolzplatzarena.net');
  }

  @log
  private setSchema<T extends Thing>(element: HTMLScriptElement, schema: WithContext<T>): void {
    element.text = JSON.stringify(schema, null, 2).replace(/\//g, '\\/');
  }

  @log
  private clearSchema(element: HTMLScriptElement): void {
    element.text = '';
  }
}
