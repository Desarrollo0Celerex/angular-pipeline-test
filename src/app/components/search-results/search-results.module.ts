import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { LabelFoundFormatModule } from '@pipes/label-found-format/label-found-format.module';
import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

import { SearchResultsComponent } from './search-results.component';

@NgModule({
  declarations: [SearchResultsComponent],
  exports: [SearchResultsComponent],
  imports: [
    CommonModule,
    ContentListModule,
    ContentSearchEngineModule,
    LabelFoundFormatModule
  ],
  providers: [LabelFoundFormatPipe]
})
export class SearchResultsModule { }
