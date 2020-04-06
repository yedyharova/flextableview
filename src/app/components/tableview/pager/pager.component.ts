import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
