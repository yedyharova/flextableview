import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Type,
} from "@angular/core";
import { ModelBase } from "@common/ModelBase";
import { MsgService } from "@services/msg.service";

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
  @Input() sortCols?: string[];

  @Input() set datatype(t: Type<T>) {
    this.tInstance = new t();
  }
  tInstance: T;
  cols: string[] = [];

  getTagColor(index: number) {
    return "var(--defined-color-" + index + ")";
  }

  constructor(
    /* private cd: ChangeDetectorRef, */ private msgService: MsgService
  ) {}

  showCopiedMsg(value: string) {
    this.msgService.showMsg(`Value: [${value}] was copied.`);
  }

  ngOnInit(): void {}
}
