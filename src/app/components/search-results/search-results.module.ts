import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { SearchResultsComponent } from './search-results.component';

@NgModule({
  declarations: [SearchResultsComponent],
  exports: [SearchResultsComponent],
  imports: [
    CommonModule,
    ContentListModule,
    ContentSearchEngineModule
  ]
})
export class SearchResultsModule { }
