import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartQuotesVsEmissionsComponent } from './chart-quotes-vs-emissions.component';

@NgModule({
  declarations: [
    ChartQuotesVsEmissionsComponent
  ],
  exports: [
      ChartQuotesVsEmissionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartQuotesVsEmissionsModule { }
