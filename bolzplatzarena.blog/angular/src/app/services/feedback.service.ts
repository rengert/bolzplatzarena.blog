import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { OfflineStorageService } from './offline-storage.service';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(
    private readonly http: HttpClient,
    private readonly commentStorage: OfflineStorageService,
  ) {
  }

  send(data: { slug: string, name: string, comment: string }): Promise<boolean> {
    return this.http.post(`${environment.apiUrl}/api/comment`, data)
      .pipe(
        mapTo(true),
        catchError(() => of(false)),
      )
      .toPromise();
  }

  init(): void {
    timer(1000, 5 * 60 * 1000).pipe(
      switchMap(() => this.update()),
    ).subscribe();
  }

  byPage(page: Page): Observable<Comment[]> {
    return this.commentStorage.commentsByContentId(page.id);
  }

  private update(): Promise<any> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/api/comments`)
      .pipe(
        switchMap(data => this.commentStorage.addComments(data)),
      ).toPromise();
  }
}
