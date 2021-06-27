import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';
import { Page } from '../models/page';
import { PostComment } from '../models/post-comment';

@Injectable({ providedIn: 'root' })
export class OfflineStorageService {
  readonly db: Dexie;

  constructor() {
    this.db = new Dexie('offline');
    this.db.version(6).stores({
      pages: '++id, link, type',
      navigation: '++id, sortOrder',
      comments: '++id, contentId',
    });
  }

  pageBySlug(link: string): Promise<Page | undefined> {
    // todo how to handle this
    if (!link.length || (link === '/')) {
      link = '/blog';
    }
    return this.db.table<Page>('pages').where({ link }).first();
  }

  commentsByContentId(contentId: string): Observable<PostComment[]> {
    return from(this.db.table<PostComment>('comments')
      .where({ contentId })
      .reverse()
      .sortBy('created'),
    );
  }

  async addPage(page: Page): Promise<void> {
    await this.db.table<Page>('pages').put(page);
  }

  sitemap(): Promise<Page[]> {
    return this.db.table<Page>('navigation').orderBy('sortOrder').toArray();
  }

  async updateSitemap(pages: Page[]): Promise<void> {
    if (!pages.length) {
      return;
    }

    await this.db.table<Page>('navigation').clear();
    await this.db.table<Page>('navigation').bulkPut(pages);
  }

  async addComments(items: Comment[]): Promise<void> {
    await this.db.table<Comment>('comments').bulkPut(items);
  }
}
