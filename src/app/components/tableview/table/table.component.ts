import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Type,
} from "@angular/core";
import { ModelBase } from "@common/ModelBase";
import { MsgService } from "@services/msg.service";
import { Observable } from "rxjs";
import { PaginationService } from "@services/pagination.service";
import { SortService, SortOrder } from "@services/sort.service";

@Component({
  selector: "dm-flex-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends ModelBase> implements OnInit {
  @Input() set data(data: T[]) {
    this._data = data;
    //this.cd.detectChanges();
  }
  _data: T[];
  get data(): T[] {
    return this._data;
  }

  @Input() set datatype(t: Type<T>) {
    this.tInstance = new t();
  }
  tInstance: T;

  getTagColor(tag: string) {
    return (
      "var(--defined-color-" +
      (this.sortService.tagsColors.indexOf(tag) + 1) +
      ")"
    );
  }

  constructor(
    /* private cd: ChangeDetectorRef, */ private msgService: MsgService,
    private paginationService: PaginationService,
    private sortService: SortService
  ) {}

  showCopiedMsg(value: string) {
    this.msgService.showMsg(`Value: [${value}] was copied.`);
  }

  setSort(col: string) {
    if (this.sortService.sortCol === col) {
      if (this.sortService.sortOrder === SortOrder.DESC) {
        this.sortService.sortCol = null;
      } else {
        this.sortService.sortOrder = SortOrder.DESC;
      }
    } else {
      this.sortService.sortCol = col;
      this.sortService.sortOrder = SortOrder.ASC;
    }
    this.paginationService.page = 1;
  }

  sortCol$: Observable<string> = this.sortService.sortCol$;
  sortOrder$: Observable<SortOrder> = this.sortService.sortOrder$;

  ngOnInit(): void {}
}
