import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentSearchEngineComponent } from './content-search-engine.component';

@NgModule({
  declarations: [ContentSearchEngineComponent],
  exports: [ContentSearchEngineComponent],
  imports: [
    CommonModule
  ]
})
export class ContentSearchEngineModule { }
