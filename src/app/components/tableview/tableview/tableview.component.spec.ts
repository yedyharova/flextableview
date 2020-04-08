import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TableViewComponent } from "./tableview.component";
import { Series } from "@models/series";

describe("TableviewComponent", () => {
  let component: TableViewComponent<Series>;
  let fixture: ComponentFixture<TableViewComponent<Series>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<TableViewComponent<Series>>(
      TableViewComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
