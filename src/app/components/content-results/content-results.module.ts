import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module'

import { ContentResultsComponent } from './content-results.component';

@NgModule({
  declarations: [ContentResultsComponent],
  exports: [ContentResultsComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule
  ]
})
export class ContentResultsModule { }
