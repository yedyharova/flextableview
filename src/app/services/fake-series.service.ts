import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Series, SeriesStore, SeriesQuery } from "@models/series";
import { map, switchMap } from "rxjs/operators";
import { PagedResultGetter } from "@common/PagedResultGetter";

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

  series$: Observable<Series[]> = this.seriesQuery.select(
    (store) =>
      store.series.map((s) => {
        return new Series(s);
      }) //TODO check
  );
  seriesPaged$: PagedResultGetter<Series> = ((
    page: number,
    pageSize: number
  ): Observable<Series[]> => {
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
