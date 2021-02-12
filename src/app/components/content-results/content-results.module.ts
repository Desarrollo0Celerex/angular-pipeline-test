import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentResultsComponent } from './content-results.component';

@NgModule({
  declarations: [ContentResultsComponent],
  exports: [ContentResultsComponent],
  imports: [
    CommonModule
  ]
})
export class ContentResultsModule { }
