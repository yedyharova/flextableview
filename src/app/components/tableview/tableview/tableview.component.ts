import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { PagedResultGetter } from "@common/PagedResultGetter";
import { ModelBase } from "@common/ModelBase";

@Component({
  selector: "dm-flex-tableview",
  templateUrl: "./tableview.component.html",
  styleUrls: ["./tableview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent<T extends ModelBase> implements OnInit {
  @Input() title: string;
  @Input() datatype: T;
  @Input() data$: PagedResultGetter<T>;
  @Input() filterCols: string[];
  @Input() searchCols: string[];
  @Input() sortCols: string[];
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  private _pageSize: number = 20;
  set pageSize(pageSize: number) {
    this.currentPage = 1;
    this._pageSize = pageSize;
  }
  get pageSize(): number {
    return this._pageSize;
  }

  constructor() {}

  ngOnInit(): void {}
}
