import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

export enum SortOrder {
  ASC,
  DESC,
}

@Injectable({
  providedIn: "root",
})
export class SortService {
  private _sortCol$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  sortCol$: Observable<string> = this._sortCol$.asObservable();
  get sortCol(): string {
    return this._sortCol$.getValue();
  }
  set sortCol(sortCol: string) {
    this._sortCol$.next(sortCol);
  }

  private _sortOrder$: BehaviorSubject<SortOrder> = new BehaviorSubject<
    SortOrder
  >(null);
  sortOrder$: Observable<SortOrder> = this._sortOrder$.asObservable();
  get sortOrder(): SortOrder {
    return this._sortOrder$.getValue();
  }
  set sortOrder(sortOrder: SortOrder) {
    this._sortOrder$.next(sortOrder);
  }
}
