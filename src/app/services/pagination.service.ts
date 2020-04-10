import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";

export const pageSizesConfig = [10, 25, 50, 100];

@Injectable({
  providedIn: "root",
})
export class PaginationService {
  private _page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  page$: Observable<number> = this._page$.asObservable();
  set page(page: number) {
    this._page$.next(page);
  }
  get page(): number {
    return this._page$.getValue();
  }

  private _pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(
    pageSizesConfig[0]
  );
  pageSize$: Observable<number> = this._pageSize$.asObservable();
  set pageSize(pageSize: number) {
    this._pageSize$.next(pageSize);
  }
  get pageSize(): number {
    return this._pageSize$.getValue();
  }

  private _total$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  total$: Observable<number> = this._total$.asObservable();
  set total(total: number) {
    this._total$.next(total);
  }
  get total(): number {
    return this._total$.getValue();
  }

  get lastPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  _pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  pages$: Observable<number[]> = this._pages$.asObservable();
  get pages(): number[] {
    return this._pages$.getValue();
  }
  set pages(pages: number[]) {
    this._pages$.next(pages);
  }
  private _setPages = combineLatest(this.total$, this.pageSize$).subscribe(
    ([total, pageSize]) => {
      const pagesArr = [];
      if (total && pageSize) {
        for (let i = 1; i <= this.lastPage; i++) {
          pagesArr.push(i); //TODO implement elipsis
        }
        this.pages = pagesArr;
      }
    }
  );
}
