import { Injectable } from '@angular/core';
import { isArray } from 'lodash-es';
import { from, Observable } from 'rxjs';
import { Page } from '../models/page';
import { PostComment } from '../models/post-comment';

enum Store {
  Pages = 'pages',
  Navigation = 'navigation',
  Comments = 'comments'
}

@Injectable({ providedIn: 'root' })
export class OfflineStorageService {
  pageBySlug(link: string): Promise<Page | undefined> {
    // todo how to handle this
    if (!link.length || (link === '/')) {
      link = '/blog';
    }

    return this.fromStore(Store.Pages, (item) => item.link === link);
  }

  commentsByContentId(contentId: string): Observable<PostComment[]> {
    return from(this.manyFromStore(Store.Comments, (item: PostComment) => contentId === item.contentId));
  }

  async addPage(page: Page): Promise<void> {
    await this.toStore(Store.Pages, page);
  }

  sitemap(): Promise<Page[]> {
    return this.manyFromStore(Store.Navigation);
  }

  async updateSitemap(pages: Page[]): Promise<void> {
    if (!pages.length) {
      return;
    }

    this.toStore(Store.Navigation, pages, true);
  }

  async addComments(items: Comment[]): Promise<void> {
    return this.toStore(Store.Comments, items);
  }

  toStore<T>(storeName: string, item: T | T[], clear = false): Promise<void> {
    const data: T[] = isArray(item) ? item : [item];
    return new Promise<void>((resolve, reject) => {
      const dbRequest = indexedDB.open('data', 4);
      dbRequest.onerror = () => {
        reject(Error('IndexedDB database error'));
      };

      dbRequest.onupgradeneeded = (event) => {
        const database = (event.currentTarget as IDBOpenDBRequest).result;
        this.migrate(database);
      };

      dbRequest.onsuccess = function (event) {
        const database = (event.currentTarget as IDBOpenDBRequest).result;
        const objectStore = database.transaction([storeName], 'readwrite').objectStore(storeName);

        if (clear) {
          objectStore.clear().onsuccess = () => {
          };
        }

        data.forEach(item => {
          const objectRequest = objectStore.put(item); // Overwrite if exists
          objectRequest.onerror = () => {
            reject();
          };
          objectRequest.onsuccess = () => {
            resolve();
          };
        });
      };

      resolve();
    });
  }

  fromStore<T>(storeName: string, resolver: (item: T) => boolean): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('data');
        dbRequest.onerror = function (event) {
          resolve(undefined);
        };

        dbRequest.onupgradeneeded = function (event) {
          (event.currentTarget as IDBOpenDBRequest).transaction?.abort();
          resolve(undefined);
        };

        dbRequest.onsuccess = function (event) {
          const database = (event.currentTarget as IDBOpenDBRequest).result;
          const store = database.transaction([storeName]).objectStore(storeName);
          var objectRequest = store.getAll();

          objectRequest.onerror = function (event) {
            reject(Error('Error text'));
          };

          objectRequest.onsuccess = function (event) {
            if (objectRequest.result) {
              const result = (objectRequest.result as T[]).find(item => resolver(item));
              if (result) {
                resolve(result);
                return;
              }
            }
            resolve(undefined);
          };
        };
      },
    );
  }

  manyFromStore<T>(storeName: string, resolver?: (item: T) => boolean): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('data');
        dbRequest.onerror = function (event) {
          resolve([]);
        };

        dbRequest.onupgradeneeded = function (event) {
          (event.currentTarget as IDBOpenDBRequest).transaction?.abort();
          resolve([]);
        };

        dbRequest.onsuccess = function (event) {
          const database = (event.currentTarget as IDBOpenDBRequest).result;
          const store = database.transaction([storeName]).objectStore(storeName);
          var objectRequest = store.getAll();

          objectRequest.onerror = function (event) {
            reject(Error('Error text'));
          };

          objectRequest.onsuccess = function (event) {
            if (objectRequest.result) {
              const result = (objectRequest.result as T[]).filter(item => !resolver || resolver(item));
              if (result) {
                resolve(result);
                return;
              }
            }
            resolve([]);
          };
        };
      },
    );
  }

  private migrate(database: IDBDatabase): void {
    database.createObjectStore('pages', { keyPath: 'id' });
    database.createObjectStore('navigation', { keyPath: 'id' });
    database.createObjectStore('comments', { keyPath: 'id' });
  }
}
