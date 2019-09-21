import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeService } from './node.service';
import { SortFilterPipe } from './sort-filter.pipe';
import { SearchListFilterPipe } from './search-list-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchListFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NodeService, SortFilterPipe, SearchListFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
