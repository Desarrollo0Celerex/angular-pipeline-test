import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';
import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { LabelFoundFormatModule } from '@pipes/label-found-format/label-found-format.module';
import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

import { ListSearchResultsRoutingModule } from './list-search-results-routing.module';
import { ListSearchResultsPage } from './list-search-results.page';

@NgModule({
  declarations: [ListSearchResultsPage],
  imports: [
    CommonModule,
    ContentListModule,
    ContentSearchEngineModule,
    LabelFoundFormatModule,
    ListSearchResultsRoutingModule,
  ],
  providers: [LabelFoundFormatPipe]
})
export class ListSearchResultsModule { }
