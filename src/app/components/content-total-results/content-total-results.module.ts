import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentTotalResultsComponent } from './content-total-results.component';

@NgModule({
  declarations: [ContentTotalResultsComponent],
  exports: [ContentTotalResultsComponent],
  imports: [
    CommonModule
  ]
})
export class ContentTotalResultsModule { }
