import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class PageStorageService {
  readonly db: Dexie;

  constructor() {
    this.db = new Dexie('offline');
    this.db.version(2).stores({
      pages: '++id, link',
    });
  }

  bySlug(link: string): Promise<Page | undefined> {
    // todo how to handle this
    if (!link.length || (link === '/')) {
      link = '/blog';
    }
    return this.db.table<Page>('pages').where({ link }).first();
  }

  async addPage(page: Page): Promise<void> {
    await this.db.table<Page>('pages').put(page);
  }
}
