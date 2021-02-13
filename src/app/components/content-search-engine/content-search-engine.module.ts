import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentSearchEngineComponent } from './content-search-engine.component';
import { ContentSearchEngineService } from './content-search-engine.service';

@NgModule({
  declarations: [ContentSearchEngineComponent],
  exports: [ContentSearchEngineComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContentSearchEngineService]
})
export class ContentSearchEngineModule { }
