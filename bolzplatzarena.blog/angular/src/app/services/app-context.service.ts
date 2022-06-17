import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface SelectionInfo {
  a: string;
  b: string;
}

interface Realobject {
  a: string;
}

function getDefault(): SelectionInfo | undefined {
  const data = localStorage.getItem('data');
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}

function isDefined<T>(value: T | undefined | null) : value is T {
  return value !== null && value !== undefined;
}

export function filterIsDefined<T>(): OperatorFunction<T | undefined | null, T> {
  return input => input.pipe(
    filter(value => isDefined(value)),
    map(data => data as T));
}

@Injectable({ providedIn: 'root' })
export class AppContextService {
  private readonly selectionInformation = new BehaviorSubject<SelectionInfo | undefined>(getDefault());
  private readonly selection = new BehaviorSubject<Realobject | undefined>(undefined);

  readonly selectionInfo$: Observable<SelectionInfo | undefined>;
  readonly definedSelection$: Observable<Realobject>;

  readonly selection$: Observable<Realobject> = this.selection.pipe(
    filterIsDefined(),
  );

  constructor() {
    this.selectionInfo$ = this.selectionInformation.asObservable();
    this.selectionInfo$.pipe(
      filterIsDefined(),
    ).subscribe( data => {
      this.selection.next({ a: data.a + '-' + data.b})
    });
    this.definedSelection$ = this.selection.pipe(filterIsDefined());
  }

  select(a: string, b: string): void {
    const data = { a, b };
    localStorage.setItem('data', JSON.stringify(data))
    this.selection.next(undefined);
    this.selectionInformation.next(data);
  }
}
