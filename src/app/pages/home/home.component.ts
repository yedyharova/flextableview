import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Type,
} from "@angular/core";
import { SeriesService } from "@services/fake-series.service";
import { Series } from "@models/series";
import { Observable } from "rxjs";

@Component({
  selector: "dm-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private seriesService: SeriesService) {}

  tableData$: (page: number, pageSize: number) => Observable<Series[]> = this
    .seriesService.seriesPaged$;
  tableType: Type<Series> = Series;
  tableFilters: {
    ["genres"]: Observable<string[]>;
    ["networks"]: Observable<string[]>;
  } = {
    genres: this.seriesService.genres$,
    networks: this.seriesService.networks$,
  };

  ngOnInit(): void {
    this.seriesService.forceGetSeries();
  }
}
