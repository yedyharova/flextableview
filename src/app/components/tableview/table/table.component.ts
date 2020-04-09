import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Type,
  ChangeDetectorRef,
} from "@angular/core";
import { ModelBase } from "@common/ModelBase";
import { MsgService } from "@services/msg.service";
import { SortOrder, sortCol$, sortOrder$ } from "@common/PagedResultGetter";
import { Observable } from "rxjs";

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
  cols: string[] = [];

  getTagColor(index: number) {
    return "var(--defined-color-" + index + ")";
  }

  constructor(
    private cd: ChangeDetectorRef, private msgService: MsgService
  ) {}

  showCopiedMsg(value: string) {
    this.msgService.showMsg(`Value: [${value}] was copied.`);
  }

  setSortConfig(col: string) {
    const sortCol = sortCol$.getValue();
    const sortOrder = sortOrder$.getValue();

    if (sortCol === col) {
      if (sortOrder === SortOrder.DESC) {
        sortCol$.next(null);
      } else {
        sortOrder$.next(SortOrder.DESC);
      }
    } else {
      sortCol$.next(col);
      sortOrder$.next(SortOrder.ASC);
    }
    this.cd.detectChanges();
  }

  sortColConfig$: Observable<string> = sortCol$.asObservable();
  sortOrderConfig$: Observable<SortOrder> = sortOrder$.asObservable();

  ngOnInit(): void {}
}
