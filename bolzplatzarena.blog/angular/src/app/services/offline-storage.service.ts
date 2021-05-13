import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class OfflineStorageService {
  readonly db: Dexie;

  constructor() {
    this.db = new Dexie('offline');
    this.db.version(3).stores({
      pages: '++id, link',
      navigation: '++id',
    });
  }

  pageBySlug(link: string): Promise<Page | undefined> {
    // todo how to handle this
    if (!link.length || (link === '/')) {
      link = '/blog';
    }
    return this.db.table<Page>('pages').where({ link }).first();
  }

  async addPage(page: Page): Promise<void> {
    await this.db.table<Page>('pages').put(page);
  }

  sitemap(): Promise<Page[]> {
    return this.db.table<Page>('navigation').toArray();
  }

  async updateSitemap(pages: Page[]): Promise<void> {
    if (!pages.length) {
      return;
    }

    await this.db.table<Page>('navigation').clear();
    await this.db.table<Page>('navigation').bulkPut(pages);
  }
}
