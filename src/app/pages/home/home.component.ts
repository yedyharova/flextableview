import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { SeriesService } from "@services/fake-series.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.forceGetSeries();
  }
}
