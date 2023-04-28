import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module'

import { ContentResultsTopComponent } from './content-results-top.component';

@NgModule({
  declarations: [
    ContentResultsTopComponent
  ],
  exports: [
      ContentResultsTopComponent
  ],
  imports: [
    CommonModule,
    PluralNameFormatModule
  ]
})
export class ContentResultsTopModule { }
