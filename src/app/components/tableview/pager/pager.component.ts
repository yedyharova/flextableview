import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
