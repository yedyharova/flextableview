import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { enableAkitaProdMode } from "@datorama/akita";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "@pages/home/home.component";
import { AboutComponent } from "@pages/about/about.component";
import { FlexTableViewModule } from "@components/tableview/tableview/tableview.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from '@angular/service-worker';

if (environment.production) {
  enableAkitaProdMode();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexTableViewModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
