import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { ContentMainActionModule } from '@components/content-main-action/content-main-action.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ProfileContentsComponent } from './profile-contents.component';

@NgModule({
  declarations: [ProfileContentsComponent],
  exports: [ProfileContentsComponent],
  imports: [
    CommonModule,
    ContentMainActionModule,
    ContentSearchEngineModule,
    ContentListModule
  ]
})
export class ProfileContentsModule { }
