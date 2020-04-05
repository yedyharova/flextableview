import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
