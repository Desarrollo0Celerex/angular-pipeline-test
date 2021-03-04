import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentTotalResultsModule } from '@components/content-total-results/content-total-results.module';

import { ContentSearchEngineComponent } from './content-search-engine.component';
import { ContentSearchEngineService } from './content-search-engine.service';

@NgModule({
  declarations: [ContentSearchEngineComponent],
  exports: [ContentSearchEngineComponent],
  imports: [
    CommonModule,
    ContentTotalResultsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContentSearchEngineService]
})
export class ContentSearchEngineModule { }
