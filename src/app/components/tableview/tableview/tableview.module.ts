import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableViewComponent } from "./tableview.component";
import { TableComponent } from "../table/table.component";
import { FilterComponent } from "../filter/filter.component";
import { PagerComponent } from "../pager/pager.component";
import { ClipboardModule } from "ngx-clipboard";
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from "@fortawesome/angular-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faCaretLeft,
  faCaretRight,
  faFastForward,
  faFastBackward,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  imports: [CommonModule, ClipboardModule, FontAwesomeModule],
  entryComponents: [],
  declarations: [
    TableViewComponent,
    TableComponent,
    FilterComponent,
    PagerComponent,
  ],
  exports: [TableViewComponent],
})
export class FlexTableViewModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    faConfig.defaultPrefix = "fas";
    library.addIcons(faSort);
    library.addIcons(faSortUp);
    library.addIcons(faSortDown);
    library.addIcons(faCaretLeft);
    library.addIcons(faCaretRight);
    library.addIcons(faFastForward);
    library.addIcons(faFastBackward);
    library.addIcons(faSearch);
  }
}
