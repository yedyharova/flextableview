import { Observable } from "rxjs";

export declare type PagedResultGetter<T> = (
  page: number,
  pageSize: number
) => Observable<T[]>;
