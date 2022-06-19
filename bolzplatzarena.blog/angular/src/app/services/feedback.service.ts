import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, timer } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';
import { PostComment } from '../models/post-comment';
import { OfflineStorageService } from './offline-storage.service';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(
    private readonly http: HttpClient,
    private readonly commentStorage: OfflineStorageService,
  ) {
  }

  send(data: { slug: string, name: string, comment: string }): Promise<boolean> {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/api/comment`, data)
        .pipe(
          mapTo(true),
          catchError(() => of(false)),
        )
    );
  }

  init(): void {
    timer(1000, 5 * 60 * 1000).pipe(
      switchMap(() => this.update()),
    ).subscribe();
  }

  byPage(page: Page): Observable<PostComment[]> {
    return this.commentStorage.commentsByContentId(page.id);
  }

  private update(): Promise<unknown> {
    return firstValueFrom(this.http.get<Comment[]>(`${environment.apiUrl}/api/comments`)
      .pipe(
        catchError(() => of([])),
        switchMap(data => this.commentStorage.addComments(data)),
      )
    );
  }
}
