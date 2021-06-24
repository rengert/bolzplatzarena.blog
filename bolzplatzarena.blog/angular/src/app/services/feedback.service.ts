import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private readonly http: HttpClient) {
  }

  send(data: { slug: string, name: string, comment: string }): Promise<boolean> {
    return this.http.post(`${environment.apiUrl}/api/comment`, data)
      .pipe(
        mapTo(true),
        catchError(() => of(false)),
      )
      .toPromise();
  }
}
