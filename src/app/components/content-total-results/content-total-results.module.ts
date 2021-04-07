import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentTotalResultsComponent } from './content-total-results.component';
import { ContentTotalResultsService } from './content-total-results.service';

@NgModule({
  declarations: [ContentTotalResultsComponent],
  exports: [ContentTotalResultsComponent],
  imports: [
    CommonModule
  ],
  providers: [ContentTotalResultsService]
})
export class ContentTotalResultsModule { }
