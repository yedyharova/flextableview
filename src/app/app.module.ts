import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { TableComponent } from "./components/tableview/table/table.component";
import { FilterComponent } from "./components/tableview/filter/filter.component";
import { PagerComponent } from "./components/tableview/pager/pager.component";
import { SearchComponent } from "./components/tableview/search/search.component";
import { AboutComponent } from "./pages/about/about.component";
import { HomeComponent } from "./pages/home/home.component";
import { TableviewComponent } from "./components/tableview/tableview/tableview.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TableviewComponent,
    TableComponent,
    FilterComponent,
    PagerComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
