import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { ContentMainActionModule } from '@components/content-main-action/content-main-action.module';
import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { LabelFoundFormatModule } from '@pipes/label-found-format/label-found-format.module';
import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

import { ContentsComponent } from './contents.component';

@NgModule({
  declarations: [ContentsComponent],
  exports: [ContentsComponent],
  imports: [
    CommonModule,
    ContentKpisModule,
    ContentListModule,
    ContentMainActionModule,
    ContentSearchEngineModule,
    LabelFoundFormatModule
  ],
  providers: [LabelFoundFormatPipe]
})
export class ContentsModule { }
