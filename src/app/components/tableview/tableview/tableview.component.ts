import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { ModelBase } from "@common/ModelBase";
import { Observable } from "rxjs";

@Component({
  selector: "dm-flex-tableview",
  templateUrl: "./tableview.component.html",
  styleUrls: ["./tableview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent<T extends ModelBase> implements OnInit {
  @Input() datatype: T;
  @Input() data$: Observable<T[]>;

  constructor() {}

  ngOnInit(): void {}
}
