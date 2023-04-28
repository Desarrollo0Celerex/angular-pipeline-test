import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module'

import { ContentTotalResultsComponent } from './content-total-results.component';
import { ContentTotalResultsService } from './content-total-results.service';

@NgModule({
  declarations: [ContentTotalResultsComponent],
  exports: [ContentTotalResultsComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule
  ],
  providers: [ContentTotalResultsService]
})
export class ContentTotalResultsModule { }
