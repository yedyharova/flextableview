import { Observable, BehaviorSubject } from "rxjs";

export enum SortOrder {
  ASC,
  DESC,
}

export const pageSizes = [5, 10, 25, 50];

export const sortCol$: BehaviorSubject<string> = new BehaviorSubject<string>(
  null
);

export const sortOrder$: BehaviorSubject<SortOrder> = new BehaviorSubject<
  SortOrder
>(null);

export const page$: BehaviorSubject<Number> = new BehaviorSubject<Number>(1);
export const pageSize$: BehaviorSubject<Number> = new BehaviorSubject<Number>(
  pageSizes[0]
);

export declare type PagedResultGetter<T> = (
  page: number,
  pageSize: number
) => Observable<T[]>;
