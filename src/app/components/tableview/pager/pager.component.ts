import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { BaseComponent } from "@common/base.component";
import {
  PaginationService,
  pageSizesConfig,
} from "@services/pagination.service";

@Component({
  selector: "flex-pager",
  templateUrl: "./pager.component.html",
  styleUrls: ["./pager.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent extends BaseComponent {
  pageSizes: number[] = [...pageSizesConfig];
  pages$: Observable<number[]> = this.paginationService.pages$;
  pageSize$: Observable<number> = this.paginationService.pageSize$;
  page$: Observable<number> = this.paginationService.page$;

  constructor(private paginationService: PaginationService) {
    super();
  }

  onPagSizeChange(pageSize: number) {
    this.paginationService.page = 1;
    this.paginationService.pageSize = pageSize;
  }

  setPage(page) {
    this.paginationService.page = page;
  }

  pageBackward() {
    if (this.paginationService.page > 1) {
      this.paginationService.page = this.paginationService.page - 1;
    }
  }

  pageForward() {
    if (this.paginationService.page < this.paginationService.lastPage) {
      this.paginationService.page = this.paginationService.page + 1;
    }
  }

  fastBackward() {
    this.paginationService.page = 1;
  }

  fastForward() {
    this.paginationService.page = this.paginationService.lastPage;
  }
}
