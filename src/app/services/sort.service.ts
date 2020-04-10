import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { PaginationService } from "./pagination.service";

export enum SortOrder {
  ASC,
  DESC,
}

@Injectable({
  providedIn: "root",
})
export class SortService {
  constructor(private paginationService: PaginationService) {}

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

  private _filters: { [col: string]: any } = {};
  get filters(): { [col: string]: any } {
    return this._filters;
  }
  setFilter(col: string, value: any) {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== NaN
    ) {
      this._filters[col] = value;
    } else {
      delete this._filters[col];
    }
    this.paginationService.page = 1;
    this._filtersChanged$.next();
  }
  private _filtersChanged$: Subject<void> = new Subject();
  filtersChanged$ = this._filtersChanged$.asObservable();
}
