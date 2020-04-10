import { OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";

export class BaseComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
