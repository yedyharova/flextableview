import { Component } from "@angular/core";
import { MsgService } from "@services/msg.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { BaseComponent } from "@common/base.component";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("fade", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(600)]),
      transition(":leave", animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class AppComponent extends BaseComponent {
  msg: string;
  constructor(private msgService: MsgService) {
    super();
  }

  ngOnInit() {
    this.msgService.msg.pipe(takeUntil(this.unsubscribe$)).subscribe((msg) => {
      this.msg = msg;
    });
  }
}
