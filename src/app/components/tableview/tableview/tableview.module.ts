import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableViewComponent } from "./tableview.component";
import { TableComponent } from "../table/table.component";
import { FilterComponent } from "../filter/filter.component";
import { PagerComponent } from "../pager/pager.component";
import { SearchComponent } from "../search/search.component";
import { ClipboardModule } from "ngx-clipboard";

@NgModule({
  imports: [CommonModule, ClipboardModule],
  entryComponents: [],
  declarations: [
    TableViewComponent,
    TableComponent,
    FilterComponent,
    PagerComponent,
    SearchComponent,
  ],
  exports: [TableViewComponent],
})
export class FlexTableViewModule {}
