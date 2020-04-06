import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { SeriesService } from "@services/fake-series.service";
import { Series } from "@models/series";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private seriesService: SeriesService) {}

  tableData$: Observable<Series[]> = this.seriesService.series$;
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
