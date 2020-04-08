import { Injectable } from "@angular/core";
import { of, BehaviorSubject, Observable } from "rxjs";
import { delay, tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MsgService {
  _msg: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  msg: Observable<string> = this._msg.asObservable();

  showMsg(msg: string) {
    of(msg)
      .pipe(
        take(1),
        tap((m) => this._msg.next(m)),
        delay(2000)
      )
      .subscribe((_) => {
        this.clearMsg();
      });
  }

  private clearMsg() {
    this._msg.next(null);
  }
}
