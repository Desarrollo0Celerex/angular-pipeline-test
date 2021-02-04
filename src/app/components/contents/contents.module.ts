import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { ContentMainActionModule } from '@components/content-main-action/content-main-action.module';
import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';

import { ContentsComponent } from './contents.component';

@NgModule({
  declarations: [ContentsComponent],
  exports: [ContentsComponent],
  imports: [
    CommonModule,
    ContentKpisModule,
    ContentListModule,
    ContentMainActionModule,
    ContentSearchEngineModule
  ]
})
export class ContentsModule { }
