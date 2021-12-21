import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { QuotationService } from '@services/quotation.service';
import { PolicyService } from '@services/policy.service';

import { ChartQuotesVsEmissionsComponent } from './chart-quotes-vs-emissions.component';

@NgModule({
  declarations: [
    ChartQuotesVsEmissionsComponent
  ],
  exports: [
      ChartQuotesVsEmissionsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PolicyService,
      QuotationService
  ]
})
export class ChartQuotesVsEmissionsModule { }
