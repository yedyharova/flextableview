import { Injectable } from "@angular/core";
import { Observable, Subject, of, combineLatest, forkJoin, empty } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Series, SeriesStore, SeriesQuery } from "@models/series";
import { map, switchMap, tap, mapTo, take } from "rxjs/operators";
import { fieldsMetaData } from "@common/colmetadata.decorator";
import { DatePipe } from "@angular/common";
import { PaginationService } from "./pagination.service";
import { SortService } from "./sort.service";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  constructor(
    private seriesStore: SeriesStore,
    private seriesQuery: SeriesQuery,
    private http: HttpClient,
    private paginationService: PaginationService,
    private sortServise: SortService
  ) {
    this._forceGetSeries$
      .pipe(
        switchMap((_) => {
          return this.getSeries$();
        })
      )
      .subscribe((_) => {
        console.debug("series has been got");
      });
  }

  series$: Observable<Series[]> = this.seriesQuery.select((store) => {
    let series = [...store.series];
    const filters = Object.keys(this.sortServise.filters);
    if (filters.length) {
      series = series.filter((s) => {
        let result = false;
        filters.forEach((col) => {
          if (~s[col].toString().indexOf(this.sortServise.filters[col])) {
            result = true;
          }
        });
        return result;
      });
    }

    if (this.sortServise.sortCol) {
      series = series.sort((sa, sb) => {
        let result: boolean;

        if (sa[this.sortServise.sortCol] === sb[this.sortServise.sortCol]) {
          return 0;
        }

        let a = sa[this.sortServise.sortCol];
        let b = sb[this.sortServise.sortCol];

        const colsMetadata = fieldsMetaData
          .get(new Series().constructor)
          .get(this.sortServise.sortCol);
        if (colsMetadata && colsMetadata.pipe instanceof DatePipe) {
          a = new Date(sa[this.sortServise.sortCol]);
          b = new Date(sb[this.sortServise.sortCol]);
        }

        if (this.sortServise.sortOrder) {
          result = a < b;
        } else {
          result = a > b;
        }

        return result ? 1 : -1;
      });
    }
    this.paginationService.total = series.length;
    return series.map((s) => {
      return new Series(s);
    }); //TODO check
  });
  seriesPaged$: Observable<Series[]> = combineLatest(
    this.paginationService.page$,
    this.paginationService.pageSize$,
    this.sortServise.sortOrder$,
    this.sortServise.filtersChanged$
  ).pipe(
    switchMap(([page, pageSize]) => {
      return this.series$.pipe(
        switchMap((series: Series[]) => {
          return of(
            series.slice(
              (page - 1) * pageSize,
              (page - 1) * pageSize + pageSize
            )
          );
        })
      );
    })
  );

  genres$: Observable<string[]> = this.seriesQuery.select(
    (store) => store.genres
  );
  networks$: Observable<string[]> = this.seriesQuery.select(
    (store) => store.networks
  );

  public forceGetSeries(): void {
    this._forceGetSeries$.next();
  }
  private _forceGetSeries$: Subject<void> = new Subject();

  private getSeries$(): Observable<Series[]> {
    return this.http.get("assets/series.json").pipe(
      map((series: any) => {
        return this.seriesStore.update({
          series: series.series,
          genres: series.genres,
          networks: series.networks,
        });
      }),
      tap((_) => this.sortServise.setFilter(null, null))
    );
  }
}
