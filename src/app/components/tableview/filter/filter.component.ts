import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Type,
} from "@angular/core";
import { BaseComponent } from "@common/base.component";
import { FilterTypes } from "@common/colmetadata.decorator";
import { Subject } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { SortService } from "@services/sort.service";
import { PaginationService } from "@services/pagination.service";

@Component({
  selector: "flex-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent<T> extends BaseComponent implements OnInit {
  @Input() set datatype(t: Type<T>) {
    this.tInstance = new t();
  }
  tInstance: T;
  filterTypes = FilterTypes;
  years: number[] = [];

  constructor(private sortService: SortService) {
    super();
  }

  setFilter(col, value) {
    this._filterChanged.next({ col: col, value: value });
  }

  private _filterChanged: Subject<{ col: string; value: any }> = new Subject();

  ngOnInit(): void {
    this._filterChanged
      .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe((filter) => {
        this.sortService.setFilter(filter.col, filter.value);
      });
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i > currentYear - 25; i--) {
      this.years.push(i);
    }
  }
}
