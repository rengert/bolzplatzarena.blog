import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor() {
  }

  send(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
