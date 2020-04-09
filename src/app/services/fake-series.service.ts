import { Injectable } from "@angular/core";
import { Observable, Subject, of, combineLatest } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Series, SeriesStore, SeriesQuery } from "@models/series";
import { map, switchMap } from "rxjs/operators";
import {
  PagedResultGetter,
  sortCol$,
  sortOrder$,
} from "@common/PagedResultGetter";
import { fieldsMetaData } from "@common/colmetadata.decorator";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class SeriesService {
  constructor(
    private seriesStore: SeriesStore,
    private seriesQuery: SeriesQuery,
    private http: HttpClient
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
    const sortCol = sortCol$.getValue();
    if (sortCol) {
      series = series.sort((sa, sb) => {
        let result: boolean;

        if (sa[sortCol] === sb[sortCol]) {
          return 0;
        }

        let a = sa[sortCol];
        let b = sb[sortCol];

        const colsMetadata = fieldsMetaData
          .get(new Series().constructor)
          .get(sortCol);
        if (colsMetadata && colsMetadata.pipe instanceof DatePipe) {
          a = new Date(sa[sortCol]);
          b = new Date(sb[sortCol]);
        }

        if (sortOrder$.getValue()) {
          result = a < b;
        } else {
          result = a > b;
        }

        return result ? 1 : -1;
      });
    }

    return series.map((s) => {
      return new Series(s);
    }); //TODO check
  });
  seriesPaged$: PagedResultGetter<Series> = ((
    page: number,
    pageSize: number
  ): Observable<Series[]> => {
    page--;
    return this.series$.pipe(
      switchMap((series: Series[]) =>
        of(series.slice(page * pageSize, page * pageSize + pageSize))
      )
    );
  }).bind(this);
  genres$: Observable<string[]> = this.seriesQuery.select(
    (store) => store.genres
  );
  networks$: Observable<string[]> = this.seriesQuery.select(
    (store) => store.networks
  );

  public forceGetSeries(): void {
    this._forceGetSeries$.next();
  }
  private _forceGetSeries$: Subject<any> = new Subject();

  private getSeries$(): Observable<Series[]> {
    return this.http.get("assets/series.json").pipe(
      map((series: any) => {
        return this.seriesStore.update({
          series: series.series,
          genres: series.genres,
          networks: series.networks,
        });
      })
    );
  }
}
